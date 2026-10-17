// LocGENStudio.exe unpacks the studio and starts local inference.
//
// The zip payload is appended to this binary:
//
//	[exe][zip][uint64 little-endian zip size][LOCGEN01]
package main

import (
	"archive/zip"
	"bytes"
	"encoding/binary"
	"fmt"
	"io"
	"net"
	"os"
	"os/exec"
	"path/filepath"
	"strings"
	"time"
)

const magic = "LOCGEN01"

func main() {
	exe, err := os.Executable()
	if err != nil {
		fail(err)
	}
	exe, _ = filepath.EvalSymlinks(exe)
	payload, err := readPayload(exe)
	if err != nil {
		fail(err)
	}
	version := payloadVersion(payload)
	app := filepath.Join(os.Getenv("LOCALAPPDATA"), "LocGENStudio", "app-"+version)
	if os.Getenv("LOCALAPPDATA") == "" {
		app = filepath.Join(filepath.Dir(exe), "LocGENStudio-app")
	}
	if err := ensureExtracted(app, payload); err != nil {
		fail(err)
	}
	models := modelsDir(exe)
	python := findPython(app, exe)
	if python == "" {
		fail(fmt.Errorf("pythonembedded was not found next to this exe or inside it.\nPut pythonembedded next to LocGENStudio.exe, or run Build-LocGENStudioExe.ps1 once so the exe contains Python, PyTorch and diffusers.\nModels stay in %s", models))
	}
	if err := os.MkdirAll(models, 0o755); err != nil {
		fail(err)
	}
	addr := "127.0.0.1:8188"
	if alreadyUp(addr) {
		openBrowser("http://" + addr + "/")
		return
	}
	cmd := exec.Command(python, "-s", filepath.Join(app, "engine", "main.py"), "--models", models, "--listen", "127.0.0.1", "--port", "8188", "--studio", filepath.Join(app, "studio"))
	cmd.Dir = app
	logPath := filepath.Join(filepath.Dir(exe), "LocGENStudio.log")
	logFile, err := os.Create(logPath)
	if err != nil {
		cmd.Stdout = os.Stdout
		cmd.Stderr = os.Stderr
	} else {
		defer logFile.Close()
		fmt.Fprintf(logFile, "LocGENStudio %s\npython %s\nmodels %s\n", version, python, models)
		cmd.Stdout = io.MultiWriter(os.Stdout, logFile)
		cmd.Stderr = io.MultiWriter(os.Stderr, logFile)
	}
	if err := cmd.Start(); err != nil {
		fail(err)
	}
	fmt.Println("LocGENStudio", version)
	fmt.Println("Models:", models)
	fmt.Println("Log:", logPath)
	deadline := time.Now().Add(40 * time.Second)
	for time.Now().Before(deadline) {
		if alreadyUp(addr) {
			openBrowser("http://" + addr + "/")
			break
		}
		time.Sleep(300 * time.Millisecond)
	}
	if err := cmd.Wait(); err != nil {
		fail(err)
	}
}

func fail(err error) {
	fmt.Fprintln(os.Stderr, err)
	fmt.Fprintln(os.Stderr, "Press Enter to close.")
	var discard [1]byte
	_, _ = os.Stdin.Read(discard[:])
	os.Exit(1)
}

func readPayload(exe string) ([]byte, error) {
	f, err := os.Open(exe)
	if err != nil {
		return nil, err
	}
	defer f.Close()
	info, err := f.Stat()
	if err != nil {
		return nil, err
	}
	if info.Size() < 16 {
		return nil, fmt.Errorf("this build has no studio payload")
	}
	tail := make([]byte, 16)
	if _, err := f.ReadAt(tail, info.Size()-16); err != nil {
		return nil, err
	}
	if string(tail[8:]) != magic {
		return nil, fmt.Errorf("this build has no studio payload")
	}
	size := binary.LittleEndian.Uint64(tail[:8])
	if size == 0 || int64(size)+16 > info.Size() {
		return nil, fmt.Errorf("studio payload size is invalid")
	}
	buf := make([]byte, size)
	if _, err := f.ReadAt(buf, info.Size()-16-int64(size)); err != nil {
		return nil, err
	}
	return buf, nil
}

func payloadVersion(payload []byte) string {
	reader, err := zip.NewReader(bytes.NewReader(payload), int64(len(payload)))
	if err != nil {
		return "0"
	}
	for _, file := range reader.File {
		if filepath.ToSlash(file.Name) == "VERSION" {
			rc, err := file.Open()
			if err != nil {
				return "0"
			}
			data, _ := io.ReadAll(rc)
			rc.Close()
			return strings.TrimSpace(string(data))
		}
	}
	return "0"
}

func ensureExtracted(app string, payload []byte) error {
	stamp := filepath.Join(app, ".payload")
	sum := fmt.Sprintf("%d", len(payload))
	if existing, err := os.ReadFile(stamp); err == nil && strings.TrimSpace(string(existing)) == sum {
		return nil
	}
	if err := os.RemoveAll(app); err != nil {
		return err
	}
	if err := os.MkdirAll(app, 0o755); err != nil {
		return err
	}
	reader, err := zip.NewReader(bytes.NewReader(payload), int64(len(payload)))
	if err != nil {
		return err
	}
	for _, file := range reader.File {
		name := filepath.Clean(filepath.FromSlash(file.Name))
		if name == "." || strings.HasPrefix(name, "..") || filepath.IsAbs(name) {
			return fmt.Errorf("unsafe path in payload: %s", file.Name)
		}
		target := filepath.Join(app, name)
		rel, err := filepath.Rel(app, target)
		if err != nil || strings.HasPrefix(rel, "..") {
			return fmt.Errorf("unsafe path in payload: %s", file.Name)
		}
		if file.FileInfo().IsDir() {
			if err := os.MkdirAll(target, 0o755); err != nil {
				return err
			}
			continue
		}
		if err := os.MkdirAll(filepath.Dir(target), 0o755); err != nil {
			return err
		}
		rc, err := file.Open()
		if err != nil {
			return err
		}
		out, err := os.OpenFile(target, os.O_CREATE|os.O_TRUNC|os.O_WRONLY, 0o644)
		if err != nil {
			rc.Close()
			return err
		}
		_, err = io.Copy(out, rc)
		rc.Close()
		out.Close()
		if err != nil {
			return err
		}
	}
	return os.WriteFile(stamp, []byte(sum), 0o644)
}

func modelsDir(exe string) string {
	beside := filepath.Join(filepath.Dir(exe), "models")
	if st, err := os.Stat(beside); err == nil && st.IsDir() {
		return beside
	}
	fallback := `C:\LocGENStudio\models`
	if st, err := os.Stat(fallback); err == nil && st.IsDir() {
		return fallback
	}
	return beside
}

func findPython(app, exe string) string {
	names := []string{
		filepath.Join(app, "pythonembedded", "python.exe"),
		filepath.Join(app, "python_embeded", "python.exe"),
		filepath.Join(filepath.Dir(exe), "pythonembedded", "python.exe"),
		filepath.Join(filepath.Dir(exe), "python_embeded", "python.exe"),
		`C:\LocGENStudio\pythonembedded\python.exe`,
		`C:\LocGENStudio\python_embeded\python.exe`,
	}
	for _, name := range names {
		if st, err := os.Stat(name); err == nil && !st.IsDir() {
			return name
		}
	}
	return ""
}

func alreadyUp(addr string) bool {
	conn, err := net.DialTimeout("tcp", addr, 400*time.Millisecond)
	if err != nil {
		return false
	}
	conn.Close()
	return true
}

func openBrowser(url string) {
	_ = exec.Command("rundll32", "url.dll,FileProtocolHandler", url).Start()
}
