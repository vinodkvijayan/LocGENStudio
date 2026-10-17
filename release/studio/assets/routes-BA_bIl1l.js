import{i as e,n as t,r as n,t as r}from"./index-CxbQuLj2.js";var i=r(`book-open`,[[`path`,{d:`M12 7v14`,key:`1akyts`}],[`path`,{d:`M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z`,key:`ruj8y`}]]),a=r(`copy`,[[`rect`,{width:`14`,height:`14`,x:`8`,y:`8`,rx:`2`,ry:`2`,key:`17jyea`}],[`path`,{d:`M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2`,key:`zix9uf`}]]),o=r(`dices`,[[`rect`,{width:`12`,height:`12`,x:`2`,y:`10`,rx:`2`,ry:`2`,key:`6agr2n`}],[`path`,{d:`m17.92 14 3.5-3.5a2.24 2.24 0 0 0 0-3l-5-4.92a2.24 2.24 0 0 0-3 0L10 6`,key:`1o487t`}],[`path`,{d:`M6 18h.01`,key:`uhywen`}],[`path`,{d:`M10 14h.01`,key:`ssrbsk`}],[`path`,{d:`M15 6h.01`,key:`cblpky`}],[`path`,{d:`M18 9h.01`,key:`2061c0`}]]),s=r(`folder-tree`,[[`path`,{d:`M20 10a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1h-2.5a1 1 0 0 1-.8-.4l-.9-1.2A1 1 0 0 0 15 3h-2a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1Z`,key:`hod4my`}],[`path`,{d:`M20 21a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1h-2.9a1 1 0 0 1-.88-.55l-.42-.85a1 1 0 0 0-.92-.6H13a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1Z`,key:`w4yl2u`}],[`path`,{d:`M3 5a2 2 0 0 0 2 2h3`,key:`f2jnh7`}],[`path`,{d:`M3 3v13a2 2 0 0 0 2 2h3`,key:`k8epm1`}]]),c=r(`images`,[[`path`,{d:`M18 22H4a2 2 0 0 1-2-2V6`,key:`pblm9e`}],[`path`,{d:`m22 13-1.296-1.296a2.41 2.41 0 0 0-3.408 0L11 18`,key:`nf6bnh`}],[`circle`,{cx:`12`,cy:`8`,r:`2`,key:`1822b1`}],[`rect`,{width:`16`,height:`16`,x:`6`,y:`2`,rx:`2`,key:`12espp`}]]),l=r(`maximize-2`,[[`polyline`,{points:`15 3 21 3 21 9`,key:`mznyad`}],[`polyline`,{points:`9 21 3 21 3 15`,key:`1avn1i`}],[`line`,{x1:`21`,x2:`14`,y1:`3`,y2:`10`,key:`ota7mn`}],[`line`,{x1:`3`,x2:`10`,y1:`21`,y2:`14`,key:`1atl0r`}]]),u=r(`minus`,[[`path`,{d:`M5 12h14`,key:`1ays0h`}]]),d=r(`monitor`,[[`rect`,{width:`20`,height:`14`,x:`2`,y:`3`,rx:`2`,key:`48i651`}],[`line`,{x1:`8`,x2:`16`,y1:`21`,y2:`21`,key:`1svkeh`}],[`line`,{x1:`12`,x2:`12`,y1:`17`,y2:`21`,key:`vw1qmm`}]]),f=r(`plus`,[[`path`,{d:`M5 12h14`,key:`1ays0h`}],[`path`,{d:`M12 5v14`,key:`s699le`}]]),p=r(`search`,[[`path`,{d:`m21 21-4.34-4.34`,key:`14j7rj`}],[`circle`,{cx:`11`,cy:`11`,r:`8`,key:`4ej97u`}]]),m=r(`trash-2`,[[`path`,{d:`M3 6h18`,key:`d0wm0j`}],[`path`,{d:`M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6`,key:`4alrt4`}],[`path`,{d:`M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2`,key:`v07s0e`}],[`line`,{x1:`10`,x2:`10`,y1:`11`,y2:`17`,key:`1uufr5`}],[`line`,{x1:`14`,x2:`14`,y1:`11`,y2:`17`,key:`xtxkd`}]]),h=r(`workflow`,[[`rect`,{width:`8`,height:`8`,x:`3`,y:`3`,rx:`2`,key:`by2w9f`}],[`path`,{d:`M7 11v4a2 2 0 0 0 2 2h4`,key:`xkn7yn`}],[`rect`,{width:`8`,height:`8`,x:`13`,y:`13`,rx:`2`,key:`1cgmvn`}]]),g=r(`x`,[[`path`,{d:`M18 6 6 18`,key:`1bl5f8`}],[`path`,{d:`m6 6 12 12`,key:`d8bk6v`}]]),_=e(n(),1),v=[`flux`,`flux2`,`krea2`,`qwen`,`zimage`,`wan`,`ltxv`,`minimax`,`sd3`,`sdxl`,`sd15`,`hunyuan`,`clip`,`generic`],y=[{id:`checkpoints`,label:`Checkpoints`,hint:`Full SD1.5 and SDXL checkpoints`,loader:`CheckpointLoaderSimple`},{id:`diffusion_models`,label:`Diffusion models`,hint:`Flux, Krea 2, Qwen Image, Z-Image, Wan, LTX, MiniMax`,loader:`UNETLoader`},{id:`unet`,label:`UNet`,hint:`Legacy twin of diffusion_models`,loader:`UNETLoader`},{id:`loras`,label:`LoRAs`,hint:`Style, identity, body and detail adapters`,loader:`LoraLoader`},{id:`vae`,label:`VAE`,hint:`ae, Qwen Image, Wan, LTX and MiniMax video VAEs`,loader:`VAELoader`},{id:`text_encoders`,label:`Text encoders`,hint:`T5, Qwen3-VL, UMT5, Gemma, CLIP-L`,loader:`CLIPLoader`},{id:`clip`,label:`CLIP`,hint:`Older text-encoder folder, still scanned`,loader:`CLIPLoader`},{id:`clip_vision`,label:`CLIP vision`,hint:`IP-Adapter and Redux vision towers`,loader:`CLIPVisionLoader`},{id:`embeddings`,label:`Embeddings`,hint:`Textual inversion tokens used in prompts`,loader:`prompt`},{id:`controlnet`,label:`ControlNet`,hint:`Pose, depth, canny, union`,loader:`ControlNetLoader`},{id:`upscale_models`,label:`Upscale`,hint:`UltraSharp, RealESRGAN, DAT`,loader:`UpscaleModelLoader`},{id:`hypernetworks`,label:`Hypernetworks`,hint:`Legacy hypernetworks`,loader:`HypernetworkLoader`},{id:`style_models`,label:`Style models`,hint:`Flux Redux style models`,loader:`StyleModelLoader`},{id:`ipadapter`,label:`IP-Adapter`,hint:`Image-prompt adapters`,loader:`IPAdapter`},{id:`vae_approx`,label:`VAE approx`,hint:`Tiny preview VAEs (TAESD)`,loader:`TAESD`},{id:`gligen`,label:`GLIGEN`,hint:`Grounded generation`,loader:`GLIGEN`},{id:`photomaker`,label:`PhotoMaker`,hint:`Identity encoders`,loader:`PhotoMaker`},{id:`audio_encoders`,label:`Audio encoders`,hint:`Audio towers for video models`,loader:`AudioEncoder`},{id:`configs`,label:`Configs`,hint:`YAML architecture configs`,loader:`config`}],b=new Set(y.map(e=>e.id)),ee={checkpoints:`checkpoints`,checkpoint:`checkpoints`,stablediffusion:`checkpoints`,diffusion_models:`diffusion_models`,diffusionmodels:`diffusion_models`,unet:`unet`,loras:`loras`,lora:`loras`,vae:`vae`,clip:`clip`,text_encoders:`text_encoders`,textencoders:`text_encoders`,text_encoder:`text_encoders`,textencoder:`text_encoders`,diffussion_models:`diffusion_models`,diffussionmodels:`diffusion_models`,diffusion_model:`diffusion_models`,clip_vision:`clip_vision`,clipvision:`clip_vision`,embeddings:`embeddings`,embedding:`embeddings`,controlnet:`controlnet`,t2i_adapter:`controlnet`,upscale_models:`upscale_models`,upscalemodels:`upscale_models`,esrgan:`upscale_models`,hypernetworks:`hypernetworks`,style_models:`style_models`,ipadapter:`ipadapter`,vae_approx:`vae_approx`,gligen:`gligen`,photomaker:`photomaker`,audio_encoders:`audio_encoders`,configs:`configs`},x=[`.safetensors`,`.ckpt`,`.pt`,`.pth`,`.bin`,`.gguf`,`.sft`],S=[{label:`LocGENStudio`,path:`C:\\LocGENStudio\\models`},{label:`Portable`,path:`C:\\ComfyUI_windows_portable\\ComfyUI\\models`},{label:`C:\\ComfyUI`,path:`C:\\ComfyUI\\models`},{label:`Stability Matrix`,path:`C:\\StabilityMatrix\\Data\\Packages\\ComfyUI\\models`}],C=S[0].path,w=`http://127.0.0.1:8188`;function T(e=`n`){return`${e}-${Math.random().toString(36).slice(2,8)}${Date.now().toString(36).slice(-2)}`}function te(e){return y.find(t=>t.id===e)??null}function E(e){let t=e.trim().toLowerCase().replace(/[\s-]+/g,`_`);return ee[t]??(b.has(t)?t:null)}function D(e){let t=e.split(/[/\\]/);return t[t.length-1]||e}function O(e){if(!e)return`—`;let t=e/1e9;if(t>=1)return`${t.toFixed(t>=10?1:2)} GB`;let n=e/1e6;return n>=1?`${n.toFixed(0)} MB`:`${Math.max(1,Math.round(e/1e3))} KB`}function ne(e){switch(e){case`flux`:return`Flux`;case`flux2`:return`Flux 2 Klein`;case`sdxl`:return`SDXL`;case`sd15`:return`SD 1.5`;case`sd3`:return`SD3`;case`wan`:return`Wan`;case`hunyuan`:return`Hunyuan`;case`krea2`:return`Krea 2`;case`qwen`:return`Qwen Image`;case`zimage`:return`Z-Image`;case`minimax`:return`MiniMax H3`;case`ltxv`:return`LTX 2.5`;case`clip`:return`CLIP`;default:return`General`}}function k(e,t){let n=e.toLowerCase(),r=n.replace(/[^a-z0-9.]+/g,``);return r.includes(`krea2`)||n.includes(`krea-2`)||n.includes(`krea 2`)?`krea2`:r.includes(`zimage`)?`zimage`:r.includes(`minimax`)||r.includes(`hailuo`)?`minimax`:r.includes(`ltxv`)||r.includes(`ltx2`)||n.includes(`ltx-2`)||n.includes(`ltx_2`)?`ltxv`:r.includes(`flux2`)||r.includes(`klein`)||n.includes(`flux-2`)||n.includes(`flux_2`)?`flux2`:r.includes(`qwen`)?`qwen`:r.includes(`flux`)?`flux`:r.includes(`wan`)||r.includes(`umt5`)?`wan`:r.includes(`hunyuan`)?`hunyuan`:r.includes(`sd3`)?`sd3`:r.includes(`sdxl`)||r.includes(`juggernaut`)||/(^|[^a-z])xl([^a-z]|$)/.test(n)?`sdxl`:r.includes(`v15`)||n.includes(`sd15`)||n.includes(`1.5`)?`sd15`:r.includes(`gemma`)?`ltxv`:r.includes(`t5`)?`flux`:n.includes(`clip_l`)||n.includes(`clip-l`)||n.includes(`clip_g`)?`clip`:t===`vae`&&/(^|[^a-z])ae([^a-z]|$)/.test(n)?`flux`:`generic`}function A(e){return e===`checkpoints`||e===`diffusion_models`||e===`unet`?`diffusion`:e===`loras`?`lora`:e===`vae`?`vae`:e===`text_encoders`||e===`clip`?`textEncoder`:null}function j(e){switch(e){case`diffusion`:return{w:248,h:168};case`lora`:return{w:248,h:176};case`textEncoder`:return{w:248,h:156};case`vae`:return{w:220,h:148};case`prompt`:return{w:280,h:150};case`sampler`:return{w:260,h:228};case`save`:return{w:210,h:104};case`image`:return{w:248,h:220};case`preview`:return{w:248,h:196};case`enhance`:return{w:280,h:236}}}function M(e){switch(e){case`diffusion`:return{inputs:[],outputs:[{name:`model`,label:`Model`,kind:`model`}]};case`lora`:return{inputs:[{name:`model`,label:`Model`,kind:`model`},{name:`clip`,label:`CLIP`,kind:`clip`}],outputs:[{name:`model`,label:`Model`,kind:`model`},{name:`clip`,label:`CLIP`,kind:`clip`}]};case`textEncoder`:return{inputs:[],outputs:[{name:`clip`,label:`CLIP`,kind:`clip`}]};case`vae`:return{inputs:[],outputs:[{name:`vae`,label:`VAE`,kind:`vae`}]};case`prompt`:return{inputs:[{name:`clip`,label:`CLIP`,kind:`clip`},{name:`text`,label:`Enhanced`,kind:`text`}],outputs:[{name:`cond`,label:`Conditioning`,kind:`cond`}]};case`sampler`:return{inputs:[{name:`model`,label:`Model`,kind:`model`},{name:`positive`,label:`Positive`,kind:`cond`},{name:`negative`,label:`Negative`,kind:`cond`},{name:`vae`,label:`VAE`,kind:`vae`},{name:`image`,label:`Image`,kind:`image`}],outputs:[{name:`image`,label:`Image`,kind:`image`}]};case`save`:return{inputs:[{name:`image`,label:`Image`,kind:`image`}],outputs:[]};case`image`:return{inputs:[],outputs:[{name:`image`,label:`Image`,kind:`image`}]};case`preview`:return{inputs:[{name:`image`,label:`Image`,kind:`image`}],outputs:[]};case`enhance`:return{inputs:[{name:`image`,label:`Image`,kind:`image`}],outputs:[{name:`text`,label:`Text`,kind:`text`}]}}}function N(e,t,n,r){let{w:i,h:a}=j(e.kind),o=Math.max(r,1)*22,s=e.y+(a-o)/2+11+n*22;return{x:t===`in`?e.x:e.x+i,y:s}}function P(e,t,n){return(n-Math.max(t,1)*22)/2+11+e*22}function re(e){switch(e){case`diffusion`:return`Diffusion`;case`lora`:return`LoRA`;case`textEncoder`:return`Text encoder`;case`vae`:return`VAE`;case`prompt`:return`Prompt`;case`sampler`:return`Sampler`;case`save`:return`Save`;case`image`:return`Image`;case`preview`:return`Preview`;case`enhance`:return`Enhancer`}}function F(e,t){return t?e.find(e=>e.id===t)??null:null}var I=[{id:`generate`,label:`Generate`},{id:`edit`,label:`Edit image`},{id:`inpaint`,label:`Inpaint`},{id:`outpaint`,label:`Outpaint`}],L=[{label:`Ollama`,url:`http://127.0.0.1:11434/v1`},{label:`LM Studio`,url:`http://127.0.0.1:1234/v1`}],R=`You rewrite image prompts. Keep the subject and the intent. Add light, lens, texture, and composition. Return only the prompt, with no explanation.`;function ie(e){return I.find(t=>t.id===(e??`generate`))?.label??`Generate`}function z(e,t){if(e.kind===`prompt`)return e.data.role===`negative`?`Negative`:`Positive`;if(e.kind===`sampler`)return ie(e.data.editMode);if(e.kind===`save`)return e.data.prefix||`locgen`;if(e.kind===`image`)return e.data.imageName||`Drop an image`;if(e.kind===`preview`)return`Preview`;if(e.kind===`enhance`)return e.data.llm||`Name an LLM`;let n=F(t,e.data.modelId);return n?D(n.name):`Choose a file`}function B(e,t){let n=F(t,e.data.modelId);if(e.kind===`prompt`){let t=(e.data.text??``).trim();return!t&&e.data.role===`negative`?`Optional. A blank negative is normal for Flux.`:t||`Write the prompt`}if(e.kind===`sampler`){let t=e.data.cfg??1,n=e.data.editMode??`generate`,r=n===`generate`?`${e.data.width??1024}×${e.data.height??1024}`:n===`outpaint`?`pad ${e.data.padLeft??128}/${e.data.padRight??128}/${e.data.padTop??128}/${e.data.padBottom??128}`:`denoise ${e.data.denoise??.55}`;return`${e.data.sampler??`euler`} · ${e.data.scheduler??`simple`} · ${e.data.steps??20} steps · ${t} cfg · ${r}`}if(e.kind===`save`)return`SaveImage prefix`;if(e.kind===`image`)return e.data.imageData?e.data.maskData?`Mask painted · wire this into the sampler`:`Wire into the sampler image port`:`Drop a picture here, or choose a file`;if(e.kind===`preview`)return`Shows the picture wired into this card`;if(e.kind===`enhance`)return e.data.endpoint?.includes(`1234`)?`LM Studio`:`Ollama or any OpenAI-compatible server`;if(e.kind===`lora`)return`model ${e.data.strengthModel??1} · clip ${e.data.strengthClip??1}`;if(!n)return`Pick a weight from the library`;let r=te(n.folder)?.label??n.folder;return`${ne(n.family)} · ${r} · ${O(n.bytes)}`}function V(e,t,n,r,i,a){return{id:e,name:t,folder:n,bytes:r,family:i,source:`demo`,note:a}}function H(){return[V(`ckpt-sdxl`,`sd_xl_base_1.0.safetensors`,`checkpoints`,6938078334,`sdxl`,`Base SDXL checkpoint. CLIP and VAE ride inside it.`),V(`ckpt-jug`,`juggernautXL_v9.safetensors`,`checkpoints`,71e8,`sdxl`,`Popular photoreal SDXL finetune.`),V(`ckpt-15`,`v1-5-pruned-emaonly.safetensors`,`checkpoints`,4265146304,`sd15`),V(`unet-flux-dev`,`flux1-dev-fp8.safetensors`,`diffusion_models`,119e8,`flux`,`Flux dev DiT. Needs CLIP-L, T5-XXL and ae.safetensors.`),V(`unet-flux-schnell`,`flux1-schnell-fp8.safetensors`,`diffusion_models`,119e8,`flux`,`Four-step Flux. Guidance stays near 1.`),V(`unet-klein`,`flux-2-klein-9b.safetensors`,`diffusion_models`,9e9,`flux2`,`Flux 2 Klein. One Qwen3 encoder and flux2-vae.`),V(`unet-krea2`,`krea2_turbo_fp8.safetensors`,`diffusion_models`,82e8,`krea2`,`Krea 2 turbo. Qwen3-VL 4B and the Qwen image VAE. 8 steps, CFG 1.`),V(`unet-qwen`,`qwen_image_2.1_int8_convrot.safetensors`,`diffusion_models`,726e7,`qwen`,`Qwen Image 2.1. Qwen3-VL 8B and qwen_image_2.1_vae.`),V(`unet-zimage`,`z_image_turbo_bf16.safetensors`,`diffusion_models`,62e8,`zimage`,`Z-Image Turbo. About 8 steps, CFG 1.`),V(`unet-wan`,`wan2.2_t2v_fp8.safetensors`,`diffusion_models`,14e9,`wan`,`Wan 2.2 text to video. UMT5-XXL and the Wan VAE.`),V(`unet-ltx`,`ltx-2.5-22b-distilled.safetensors`,`diffusion_models`,22e9,`ltxv`,`LTX 2.5 distilled. Gemma encoder and the video VAE.`),V(`unet-h3`,`minimax_h3_fl2va_fp8.safetensors`,`diffusion_models`,16e9,`minimax`,`MiniMax H3. Qwen3-VL encoder and the video VAE.`),V(`lora-realism`,`flux_realism.safetensors`,`loras`,164e6,`flux`),V(`lora-skin`,`skin_detail_flux.safetensors`,`loras`,148e6,`flux`),V(`lora-body`,`body_identity_flux.safetensors`,`loras`,219e6,`flux`,`Body-only adapter. Keep the face on a separate reference pass.`),V(`lora-detail-xl`,`detail_tweaker_xl.safetensors`,`loras`,98e6,`sdxl`),V(`lora-more`,`add_more_details.safetensors`,`loras`,148e6,`sdxl`),V(`vae-ae`,`ae.safetensors`,`vae`,335304388,`flux`,`Flux / SD3 autoencoder.`),V(`vae-flux2`,`flux2-vae.safetensors`,`vae`,335e6,`flux2`),V(`vae-qwen`,`qwen_image_vae.safetensors`,`vae`,25e7,`krea2`,`Shared by Krea 2 and earlier Qwen Image.`),V(`vae-qwen21`,`qwen_image_2.1_vae_bf16.safetensors`,`vae`,676e6,`qwen`),V(`vae-wan`,`wan_2.1_vae.safetensors`,`vae`,25e7,`wan`,`Wan 2.2 still uses this video VAE.`),V(`vae-ltx`,`ltx-2.5-video-vae-bf16.safetensors`,`vae`,8e8,`ltxv`),V(`vae-h3`,`minimax_h3_video_vae_fp16.safetensors`,`vae`,5e8,`minimax`),V(`vae-xl`,`sdxl_vae.safetensors`,`vae`,334641162,`sdxl`),V(`vae-mse`,`vae-ft-mse-840000-ema-pruned.safetensors`,`vae`,334641190,`sd15`),V(`te-clip-l`,`clip_l.safetensors`,`text_encoders`,246144152,`clip`,`CLIP-L. First tower in DualCLIPLoader.`),V(`te-clip-g`,`clip_g.safetensors`,`text_encoders`,136e7,`clip`),V(`te-t5`,`t5xxl_fp8_e4m3fn.safetensors`,`text_encoders`,489e7,`flux`,`T5-XXL fp8. Second tower for Flux.`),V(`te-t5-fp16`,`t5xxl_fp16.safetensors`,`text_encoders`,977e7,`flux`),V(`te-qwen4b`,`qwen3vl_4b_fp8.safetensors`,`text_encoders`,42e8,`krea2`,`Krea 2 text encoder.`),V(`te-qwen8b`,`qwen3vl_8b_int8_convrot.safetensors`,`text_encoders`,935e7,`qwen`,`Qwen Image 2.1 text encoder.`),V(`te-qwen3`,`qwen_3_8b.safetensors`,`text_encoders`,8e9,`flux2`,`Flux 2 Klein text encoder. Z-Image can use the 4B sibling.`),V(`te-umt5`,`umt5_xxl_fp8_e4m3fn.safetensors`,`text_encoders`,67e8,`wan`),V(`te-gemma`,`gemma4_12b_ltx_2.5.safetensors`,`text_encoders`,12e9,`ltxv`),V(`te-h3`,`qwen3vl_32b_minimax_h3_fp8.safetensors`,`text_encoders`,18e9,`minimax`),V(`cv-siglip`,`sigclip_vision_patch14_384.safetensors`,`clip_vision`,857e6,`generic`),V(`emb-easy`,`EasyNegative.safetensors`,`embeddings`,25e3,`sd15`,`Drop the file name into a negative prompt.`),V(`emb-hand`,`badhandv4.pt`,`embeddings`,48e3,`generic`),V(`cn-canny`,`controlnet-canny-sdxl.safetensors`,`controlnet`,25e8,`sdxl`),V(`up-ultra`,`4x-UltraSharp.pth`,`upscale_models`,67e6,`generic`),V(`up-esr`,`RealESRGAN_x4plus.pth`,`upscale_models`,67e6,`generic`)]}function U(e,t,n,r,i){return{id:e,kind:t,x:n,y:r,data:i}}function W(e,t,n,r,i){return{id:e,fromNode:t,fromPort:n,toNode:r,toPort:i}}function ae(){return{id:`wf-flux`,name:`Flux portrait`,pan:{x:28,y:96},zoom:.84,selectedId:null,nodes:[U(`clip-l`,`textEncoder`,28,8,{modelId:`te-clip-l`}),U(`t5`,`textEncoder`,28,156,{modelId:`te-t5`}),U(`unet`,`diffusion`,28,320,{modelId:`unet-flux-dev`,weightDtype:`default`}),U(`vae`,`vae`,28,490,{modelId:`vae-ae`}),U(`pos`,`prompt`,470,8,{role:`positive`,text:`Photoreal editorial portrait, soft window light, natural skin with visible pores and fine hair, shallow depth of field, 85mm lens, quiet expression`}),U(`neg`,`prompt`,470,200,{role:`negative`,text:``}),U(`lora`,`lora`,470,400,{modelId:`lora-realism`,strengthModel:.75,strengthClip:.75}),U(`sam`,`sampler`,860,150,{steps:20,cfg:3.5,sampler:`euler`,scheduler:`simple`,seed:770411,width:1024,height:1024,batch:1,denoise:1}),U(`save`,`save`,860,360,{prefix:`locgen/flux`})],edges:[W(`e1`,`clip-l`,`clip`,`pos`,`clip`),W(`e2`,`t5`,`clip`,`pos`,`clip`),W(`e5`,`unet`,`model`,`lora`,`model`),W(`e6`,`lora`,`model`,`sam`,`model`),W(`e7`,`pos`,`cond`,`sam`,`positive`),W(`e8`,`neg`,`cond`,`sam`,`negative`),W(`e9`,`vae`,`vae`,`sam`,`vae`),W(`e10`,`sam`,`image`,`save`,`image`)]}}function oe(){return{id:`wf-schnell`,name:`Flux Schnell`,pan:{x:40,y:96},zoom:.95,selectedId:null,nodes:[U(`clip-l`,`textEncoder`,28,8,{modelId:`te-clip-l`}),U(`t5`,`textEncoder`,28,156,{modelId:`te-t5`}),U(`unet`,`diffusion`,28,320,{modelId:`unet-flux-schnell`,weightDtype:`default`}),U(`vae`,`vae`,28,490,{modelId:`vae-ae`}),U(`pos`,`prompt`,400,24,{role:`positive`,text:`Sunlit Kerala courtyard, cotton clothes, natural color, documentary photograph, sharp but not plastic`}),U(`sam`,`sampler`,780,160,{steps:4,cfg:1,sampler:`euler`,scheduler:`simple`,seed:12,width:1024,height:1024,batch:1,denoise:1}),U(`save`,`save`,780,360,{prefix:`locgen/schnell`})],edges:[W(`e1`,`clip-l`,`clip`,`pos`,`clip`),W(`e2`,`t5`,`clip`,`pos`,`clip`),W(`e3`,`unet`,`model`,`sam`,`model`),W(`e4`,`pos`,`cond`,`sam`,`positive`),W(`e5`,`vae`,`vae`,`sam`,`vae`),W(`e6`,`sam`,`image`,`save`,`image`)]}}function G(e){return{id:e.id,name:e.name,pan:{x:36,y:96},zoom:.9,selectedId:null,nodes:[U(`te`,`textEncoder`,28,16,{modelId:e.textId}),U(`unet`,`diffusion`,28,180,{modelId:e.diffusionId,weightDtype:`default`}),U(`vae`,`vae`,28,360,{modelId:e.vaeId}),U(`pos`,`prompt`,470,24,{role:`positive`,text:e.prompt}),U(`sam`,`sampler`,860,140,{steps:e.steps,cfg:e.cfg,sampler:`euler`,scheduler:`simple`,seed:2104,width:e.width,height:e.height,batch:1,frames:e.frames??1,denoise:1}),U(`save`,`save`,860,360,{prefix:e.prefix})],edges:[W(`e1`,`te`,`clip`,`pos`,`clip`),W(`e2`,`unet`,`model`,`sam`,`model`),W(`e3`,`pos`,`cond`,`sam`,`positive`),W(`e4`,`vae`,`vae`,`sam`,`vae`),W(`e5`,`sam`,`image`,`save`,`image`)]}}function se(){return G({id:`wf-klein`,name:`Flux 2 Klein`,diffusionId:`unet-klein`,textId:`te-qwen3`,vaeId:`vae-flux2`,prompt:`Photoreal portrait, natural skin, window light, 85mm, quiet expression`,steps:4,cfg:1,width:1024,height:1024,prefix:`locgen/klein`})}function ce(){return G({id:`wf-krea2`,name:`Krea 2`,diffusionId:`unet-krea2`,textId:`te-qwen4b`,vaeId:`vae-qwen`,prompt:`Editorial photograph, natural color, fine skin texture, soft daylight`,steps:8,cfg:1,width:1024,height:1024,prefix:`locgen/krea2`})}function le(){return G({id:`wf-qwen`,name:`Qwen Image 2.1`,diffusionId:`unet-qwen`,textId:`te-qwen8b`,vaeId:`vae-qwen21`,prompt:`A paper poster on a studio wall, clear lettering, soft shadow, photograph`,steps:20,cfg:1,width:1328,height:1328,prefix:`locgen/qwen`})}function ue(){return G({id:`wf-zimage`,name:`Z-Image Turbo`,diffusionId:`unet-zimage`,textId:`te-qwen3`,vaeId:`vae-qwen`,prompt:`Close portrait, visible pores, afternoon light, 50mm photograph`,steps:8,cfg:1,width:1024,height:1024,prefix:`locgen/zimage`})}function de(){return G({id:`wf-wan`,name:`Wan 2.2`,diffusionId:`unet-wan`,textId:`te-umt5`,vaeId:`vae-wan`,prompt:`A person walks toward camera on a shaded road, natural motion, steady shot`,steps:20,cfg:5,width:832,height:480,frames:49,prefix:`locgen/wan`})}function fe(){return G({id:`wf-ltx`,name:`LTX 2.5`,diffusionId:`unet-ltx`,textId:`te-gemma`,vaeId:`vae-ltx`,prompt:`Handheld shot, a cup of tea set on a wooden table, steam rising`,steps:8,cfg:1,width:768,height:448,frames:49,prefix:`locgen/ltx`})}function pe(){return G({id:`wf-minimax`,name:`MiniMax H3`,diffusionId:`unet-h3`,textId:`te-h3`,vaeId:`vae-h3`,prompt:`A slow push-in on a face, natural blink, quiet room tone`,steps:20,cfg:1,width:768,height:448,frames:49,prefix:`locgen/minimax`})}function me(){return{id:`wf-sdxl`,name:`SDXL base`,pan:{x:48,y:100},zoom:1,selectedId:null,nodes:[U(`ckpt`,`diffusion`,28,80,{modelId:`ckpt-sdxl`,weightDtype:`default`}),U(`pos`,`prompt`,380,8,{role:`positive`,text:`full body fashion photograph, linen shirt, late afternoon light, realistic skin, 50mm`}),U(`neg`,`prompt`,380,190,{role:`negative`,text:`blurry, extra fingers, watermark, plastic skin, EasyNegative`}),U(`lora`,`lora`,380,390,{modelId:`lora-detail-xl`,strengthModel:.6,strengthClip:.6}),U(`sam`,`sampler`,760,120,{steps:28,cfg:6,sampler:`dpmpp_2m`,scheduler:`karras`,seed:404,width:1024,height:1024,batch:1,denoise:1}),U(`save`,`save`,760,340,{prefix:`locgen/sdxl`})],edges:[W(`e1`,`ckpt`,`model`,`lora`,`model`),W(`e2`,`lora`,`model`,`sam`,`model`),W(`e3`,`pos`,`cond`,`sam`,`positive`),W(`e4`,`neg`,`cond`,`sam`,`negative`),W(`e5`,`sam`,`image`,`save`,`image`)]}}function he(){return{id:`wf-edit`,name:`Image edit`,pan:{x:24,y:28},zoom:.92,selectedId:`sam`,nodes:[U(`ckpt`,`diffusion`,24,180,{modelId:`ckpt-sdxl`,weightDtype:`default`}),U(`img`,`image`,24,400,{}),U(`enh`,`enhance`,340,8,{system:R,text:`Keep the person. Change the light to late afternoon and the background to a quiet street.`,llm:``,endpoint:L[0].url,temperature:.4}),U(`pos`,`prompt`,680,8,{role:`positive`,text:`Keep the person. Change the light to late afternoon and the background to a quiet street.`}),U(`neg`,`prompt`,680,200,{role:`negative`,text:`blurry, extra fingers, watermark, plastic skin`}),U(`sam`,`sampler`,1040,80,{steps:28,cfg:6,sampler:`dpmpp_2m`,scheduler:`karras`,seed:21,width:1024,height:1024,batch:1,denoise:.55,editMode:`edit`,padLeft:160,padRight:160,padTop:96,padBottom:96}),U(`view`,`preview`,1040,360,{}),U(`save`,`save`,1340,160,{prefix:`locgen/edit`})],edges:[W(`e1`,`ckpt`,`model`,`sam`,`model`),W(`e2`,`enh`,`text`,`pos`,`text`),W(`e3`,`pos`,`cond`,`sam`,`positive`),W(`e4`,`neg`,`cond`,`sam`,`negative`),W(`e5`,`img`,`image`,`sam`,`image`),W(`e6`,`img`,`image`,`view`,`image`),W(`e7`,`sam`,`image`,`save`,`image`)]}}function ge(e,t,n){let r=T(e.slice(0,3)),i={};return e===`lora`&&(i.strengthModel=.8,i.strengthClip=.8),e===`diffusion`&&(i.weightDtype=`default`),e===`prompt`&&(i.role=`positive`,i.text=``),e===`sampler`&&(i.steps=20,i.cfg=3.5,i.sampler=`euler`,i.scheduler=`simple`,i.seed=Math.floor(Math.random()*1e6),i.width=1024,i.height=1024,i.batch=1,i.denoise=1,i.editMode=`generate`,i.padLeft=128,i.padRight=128,i.padTop=128,i.padBottom=128),e===`save`&&(i.prefix=`locgen`),e===`enhance`&&(i.system=R,i.text=``,i.llm=``,i.endpoint=L[0].url,i.temperature=.4),{id:r,kind:e,x:t,y:n,data:i}}var _e=[`euler`,`euler_ancestral`,`dpmpp_2m`,`dpmpp_sde`,`uni_pc`,`heun`,`ddim`,`lcm`],ve=[`simple`,`normal`,`karras`,`beta`,`exponential`,`sgm_uniform`];function ye(e,t){let n=e.nodes.map(e=>e.data.modelId).filter(e=>!!e);if(n.length===0)return`Choose weights from the models folder before running.`;let r=n.map(e=>t.find(t=>t.id===e)).filter(e=>!!e);return r.length===0||r.some(e=>e.source===`demo`)?`This graph still points at the sample library. Link the models folder and pick the files on disk.`:null}function be(e,t){return e.filter(e=>A(e.folder)===t)}function K(e,t,n){return e.filter(e=>e.toNode===t&&e.toPort===n)}function q(e,t){return e.find(e=>e.id===t)}function xe(e){return/t5|umt5|llama/i.test(e)}function Se(e){switch(e){case`flux`:return`flux`;case`flux2`:return`flux2`;case`sd3`:return`sd3`;case`sdxl`:return`sdxl`;case`hunyuan`:return`hunyuan_video`;case`krea2`:return`krea2`;case`qwen`:case`zimage`:return`qwen_image`;case`wan`:return`wan`;case`ltxv`:return`ltxv`;case`minimax`:return`minimax`;default:return`stable_diffusion`}}var Ce=[`flux`,`flux2`,`sd3`,`wan`,`hunyuan`,`krea2`,`qwen`,`zimage`,`minimax`,`ltxv`],we=[`flux`,`sd3`,`hunyuan`],Te=[`wan`,`hunyuan`,`minimax`,`ltxv`];function Ee(e){switch(e){case`flux`:return`Flux wants CLIP-L and T5-XXL.`;case`flux2`:return`Flux 2 Klein wants a Qwen3 text encoder and flux2-vae.`;case`krea2`:return`Krea 2 wants Qwen3-VL 4B and the Qwen image VAE.`;case`qwen`:return`Qwen Image 2.1 wants Qwen3-VL 8B and qwen_image_2.1_vae.`;case`zimage`:return`Z-Image wants its Qwen text encoder and VAE. Turbo is about 8 steps at CFG 1.`;case`wan`:return`Wan 2.2 wants UMT5-XXL and the Wan VAE.`;case`ltxv`:return`LTX 2.5 wants the Gemma text encoder and the video VAE.`;case`minimax`:return`MiniMax H3 wants its Qwen3-VL text encoder and the video VAE.`;case`sd3`:return`SD3 wants CLIP-L, CLIP-G and T5.`;default:return`Wire a text encoder into the prompt.`}}function De(e){return e.folder===`diffusion_models`||e.folder===`unet`||Ce.includes(e.family)}function Oe(e,t){let n=[],r={},i=[],a=1,o=(e,t)=>{let n=String(a++);return r[n]={class_type:e,inputs:t},i.push(e),n},s=e.nodes.filter(e=>e.kind===`sampler`),c=s.find(t=>K(e.edges,t.id,`model`).length)??s[0];if(!c)return n.push({level:`error`,message:`Add a sampler node.`}),J(n,r,i,`No sampler`);s.length>1&&n.push({level:`warn`,message:`More than one sampler — compiling the one wired to a model.`});let l=K(e.edges,c.id,`model`)[0];l||n.push({level:`error`,message:`Connect a diffusion model to the sampler model port.`});let u=[],d=null,f=l?q(e.nodes,l.fromNode):void 0,p=new Set;for(;f&&!p.has(f.id);)if(p.add(f.id),f.kind===`lora`){u.push(f);let t=K(e.edges,f.id,`model`)[0];f=t?q(e.nodes,t.fromNode):void 0}else{if(f.kind===`diffusion`){d=f;break}n.push({level:`error`,message:`The model chain must be diffusion weights, optionally through LoRAs.`});break}u.reverse();let m=d?F(t,d.data.modelId):null;d&&!m&&n.push({level:`error`,message:`The diffusion node has no file selected.`}),m&&Ce.includes(m.family)&&m.folder===`checkpoints`&&n.push({level:`warn`,message:`${m.name} looks like ${m.family} weights but lives in checkpoints. diffusion_models is where UNETLoader looks.`});for(let e of u){let r=F(t,e.data.modelId);r?r.folder!==`loras`&&n.push({level:`warn`,message:`${r.name} is not in loras/. LoraLoader will not see it.`}):n.push({level:`error`,message:`A LoRA node has no file selected.`})}let h=K(e.edges,c.id,`positive`)[0],g=K(e.edges,c.id,`negative`)[0],_=h?q(e.nodes,h.fromNode):void 0,v=g?q(e.nodes,g.fromNode):void 0;(!_||_.kind!==`prompt`)&&n.push({level:`error`,message:`Connect a positive prompt to the sampler.`});let y=[],b=new Set;for(let t of[_,v])if(t)for(let n of K(e.edges,t.id,`clip`)){let t=q(e.nodes,n.fromNode);t&&t.kind===`textEncoder`&&!b.has(t.id)&&(b.add(t.id),y.push(t))}let ee=K(e.edges,c.id,`vae`)[0],x=ee?q(e.nodes,ee.fromNode):void 0,S=x&&x.kind===`vae`?F(t,x.data.modelId):null;x&&x.kind===`vae`&&!S&&n.push({level:`error`,message:`The VAE node has no file selected.`});let C=m?.family??`generic`,w=m?De(m)&&m.folder!==`checkpoints`:!1,T=!(!m||w);w&&y.length===0&&n.push({level:`error`,message:Ee(C)}),w&&!S&&n.push({level:`error`,message:`Connect a VAE. ${Ee(C)}`}),T&&y.length===0&&n.push({level:`warn`,message:`No text encoder wired — CLIP inside the checkpoint will be used.`}),v||n.push({level:`warn`,message:`No negative prompt. An empty one will be encoded.`});let E=c.data.editMode??`generate`,D=K(e.edges,c.id,`image`)[0],O=D?q(e.nodes,D.fromNode):void 0;E!==`generate`&&(!O||O.kind!==`image`?n.push({level:`error`,message:`Connect an image card to the sampler for edit, inpaint, or outpaint.`}):O.data.imageData?E===`inpaint`&&!O.data.maskData&&n.push({level:`error`,message:`Paint a mask on the image. That is the area the model will change.`}):n.push({level:`error`,message:`Load a picture on the image card. Drop a file on the canvas or choose one.`}));for(let t of[_,v]){if(!t||t.kind!==`prompt`)continue;let r=K(e.edges,t.id,`text`)[0];if(!r)continue;let i=q(e.nodes,r.fromNode);!i||i.kind!==`enhance`?n.push({level:`error`,message:`The enhanced port only accepts a prompt enhancer.`}):((i.data.llm??``).trim()||n.push({level:`error`,message:`The prompt enhancer needs an LLM model name.`}),(i.data.text??``).trim()||(t.data.text??``).trim()||n.push({level:`error`,message:`The prompt enhancer needs a prompt to rewrite.`}))}if(n.some(e=>e.level===`error`)||!m||!_)return J(n,r,i,ke(e,t));let k,A=null,j=[`missing`,0];if(w){let e=d?.data.weightDtype??`default`;k=[o(`UNETLoader`,{unet_name:m.name,weight_dtype:e}),0],m.folder===`unet`&&n.push({level:`warn`,message:`File is in unet/. ComfyUI still loads it, diffusion_models is the current folder.`})}else{let e=o(`CheckpointLoaderSimple`,{ckpt_name:m.name});k=[e,0],A=[e,1],j=[e,2],y.length&&(n.push({level:`warn`,message:`Text encoders are wired, so the checkpoint CLIP is ignored.`}),A=null)}if(y.length){let a=y.map(e=>F(t,e.data.modelId));if(a.some(e=>!e))return n.push({level:`error`,message:`A text encoder node has no file selected.`}),J(n,r,i,ke(e,t));let s=a.filter(e=>!!e);for(let e of s)e.folder!==`text_encoders`&&e.folder!==`clip`&&n.push({level:`warn`,message:`${e.name} is in ${te(e.folder)?.label}. DualCLIPLoader reads text_encoders and clip.`});if(s.length>=2&&we.includes(C)){let e=s.find(e=>xe(e.name)),t=s.find(t=>t!==e)??s[0],r=e??s[1];e||n.push({level:`warn`,message:`Two text encoders, but neither looks like T5. Order is file list order.`}),A=[o(`DualCLIPLoader`,{clip_name1:(e?t:s[0]).name,clip_name2:(e?r:s[1]).name,type:Se(C===`generic`?`flux`:C)}),0]}else s.length>=2&&n.push({level:`warn`,message:`${ne(C)} uses one text encoder. The extra file is ignored.`}),A=[o(`CLIPLoader`,{clip_name:s[0].name,type:Se(C)}),0]}if(!A)return n.push({level:`error`,message:`No CLIP source. Wire text encoders or use a full checkpoint.`}),J(n,r,i,ke(e,t));for(let e of u){let n=F(t,e.data.modelId);if(!n)continue;let r=o(`LoraLoader`,{lora_name:n.name,strength_model:e.data.strengthModel??1,strength_clip:e.data.strengthClip??1,model:k,clip:A});k=[r,0],A=[r,1]}if(S)S.folder!==`vae`&&n.push({level:`warn`,message:`${S.name} is not in vae/.`}),j=[o(`VAELoader`,{vae_name:S.name}),0];else if(!T)return n.push({level:`error`,message:`VAE missing.`}),J(n,r,i,ke(e,t));let M=[o(`CLIPTextEncode`,{text:oe(_,``),clip:A}),0],N=c.data.cfg??1,P=C===`flux`||C===`sd3`;P&&N>1&&(M=[o(`FluxGuidance`,{conditioning:M,guidance:N}),0]);let re=[o(`CLIPTextEncode`,{text:v&&v.kind===`prompt`?oe(v,``):``,clip:A}),0],I=Math.max(64,Math.round(c.data.width??1024)),L=Math.max(64,Math.round(c.data.height??1024)),R=Math.max(1,Math.round(c.data.batch??1)),ie=Te.includes(C),z=Math.max(1,Math.round(c.data.frames??(ie?49:1))),B;if(E!==`generate`&&O?.data.imageData){let e=o(`LoadImage`,{image:O.data.imageData});if(E===`outpaint`){let t=o(`ImagePadForOutpaint`,{image:[e,0],left:Math.max(0,Math.round(c.data.padLeft??128)),right:Math.max(0,Math.round(c.data.padRight??128)),top:Math.max(0,Math.round(c.data.padTop??128)),bottom:Math.max(0,Math.round(c.data.padBottom??128)),feathering:32});B=o(`VAEEncodeForInpaint`,{pixels:[t,0],mask:[t,1],vae:j})}else if(E===`inpaint`){let t=o(`LoadImage`,{image:O.data.maskData??``});B=o(`VAEEncodeForInpaint`,{pixels:[e,0],mask:[t,0],vae:j})}else B=o(`VAEEncode`,{pixels:[e,0],vae:j})}else B=C===`ltxv`?o(`EmptyLTXVLatentVideo`,{width:I,height:L,length:z,batch_size:R}):ie?o(`EmptyHunyuanLatentVideo`,{width:I,height:L,length:z,batch_size:R}):o(P||Ce.includes(C)?`EmptySD3LatentImage`:`EmptyLatentImage`,{width:I,height:L,batch_size:R});let V=o(`VAEDecode`,{samples:[o(`KSampler`,{seed:Math.round(c.data.seed??0),steps:Math.max(1,Math.round(c.data.steps??20)),cfg:P&&N>1?1:N,sampler_name:c.data.sampler??`euler`,scheduler:c.data.scheduler??`simple`,denoise:c.data.denoise??1,model:k,positive:M,negative:re,latent_image:[B,0]}),0],vae:j}),H=e.edges.find(t=>t.fromNode!==c.id||t.fromPort!==`image`?!1:q(e.nodes,t.toNode)?.kind===`save`),U=H?q(e.nodes,H.toNode):void 0,W=U&&U.kind===`save`&&U.data.prefix||`locgen`;U||n.push({level:`warn`,message:`No save node. Prefix defaults to locgen.`}),o(`SaveImage`,{filename_prefix:W,images:[V,0]});let ae=u.map(e=>F(t,e.data.modelId)?.name).filter(Boolean).map(e=>e.split(/[/\\]/).pop());return J(n,r,i,[m.name,ae.length?`LoRA ${ae.join(` → `)}`:null,`${c.data.steps??20} steps`,P&&N>1?`guidance ${N}`:`cfg ${N}`,ie?`${I}×${L} · ${z} frames`:E===`generate`?`${I}×${L}`:E].filter(Boolean).join(` · `));function oe(t,n){let r=K(e.edges,t.id,`text`)[0];if(!r)return t.data.text??n;let i=q(e.nodes,r.fromNode);if(!i||i.kind!==`enhance`)return t.data.text??n;let a=``,s=K(e.edges,i.id,`image`)[0];if(s){let t=q(e.nodes,s.fromNode);t?.kind===`image`&&(a=t.data.imageData??``)}return[o(`PromptEnhancer`,{system:i.data.system||`You rewrite image prompts. Keep the subject and the intent. Add light, lens, texture, and composition. Return only the prompt, with no explanation.`,prompt:(i.data.text??``).trim()||(t.data.text??``).trim(),model:(i.data.llm??``).trim(),base_url:(i.data.endpoint||`http://127.0.0.1:11434/v1`).replace(/\/$/,``),temperature:i.data.temperature??.4,image:a}),0]}}function ke(e,t){return e.nodes.map(e=>z(e,t)).slice(0,4).join(` · `)||`Incomplete graph`}function J(e,t,n,r){return{ok:!e.some(e=>e.level===`error`),issues:e,prompt:t,summary:r,chain:n}}function Ae(e){return new Promise((t,n)=>{let r=new FileReader;r.onerror=()=>n(Error(`Could not read that image.`)),r.onload=()=>{let i=new Image;i.onload=()=>{let r=Math.min(1,1280/Math.max(i.width,i.height)),a=Math.max(64,Math.round(i.width*r/8)*8),o=Math.max(64,Math.round(i.height*r/8)*8),s=document.createElement(`canvas`);s.width=a,s.height=o;let c=s.getContext(`2d`);c?(c.drawImage(i,0,0,a,o),t({name:e.name,data:s.toDataURL(`image/jpeg`,.86),width:a,height:o})):n(Error(`Could not prepare that image.`))},i.onerror=()=>n(Error(`That file is not an image the browser can open.`)),i.src=String(r.result??``)},r.readAsDataURL(e)})}var je=e=>{let t,n=new Set,r=(e,r)=>{let i=typeof e==`function`?e(t):e;if(!Object.is(i,t)){let e=t;t=r??(typeof i!=`object`||!i)?i:Object.assign({},t,i),n.forEach(n=>n(t,e))}},i=()=>t,a={setState:r,getState:i,getInitialState:()=>o,subscribe:e=>(n.add(e),()=>n.delete(e))},o=t=e(r,i,a);return a},Me=(e=>e?je(e):je),Ne=e=>e;function Pe(e,t=Ne){let n=_.useSyncExternalStore(e.subscribe,_.useCallback(()=>t(e.getState()),[e,t]),_.useCallback(()=>t(e.getInitialState()),[e,t]));return _.useDebugValue(n),n}var Fe=e=>{let t=Me(e),n=e=>Pe(t,e);return Object.assign(n,t),n},Ie=(e=>e?Fe(e):Fe),Le=`locgen-studio-v1`;function Re(){return[ae(),oe(),me()]}function ze(e){return e.workflows.find(t=>t.id===e.activeId)??e.workflows[0]}function Y(e,t){return{workflows:e.workflows.map(n=>n.id===e.activeId?t(n):n)}}var X=Ie((e,t)=>({rootPath:C,engineUrl:w,linkLabel:null,models:H(),workflows:Re(),activeId:`wf-flux`,jobs:[],view:`canvas`,viewportPx:{w:1280,h:800},hydrated:!1,setView:t=>e({view:t}),setViewport:(t,n)=>e({viewportPx:{w:t,h:n}}),setRootPath:t=>e({rootPath:t}),setEngineUrl:t=>e({engineUrl:t}),setLinkLabel:t=>e({linkLabel:t}),replaceModels:(n,r)=>e({models:n,linkLabel:r===void 0?t().linkLabel:r}),addModel:n=>e({models:[n,...t().models.filter(e=>e.folder!==n.folder||e.name!==n.name)]}),removeModel:n=>e({models:t().models.filter(e=>e.id!==n)}),restoreDemo:()=>e({models:H(),linkLabel:null}),setActive:t=>e({activeId:t}),renameActive:n=>e(Y(t(),e=>({...e,name:n}))),addWorkflow:n=>e({workflows:[...t().workflows,n],activeId:n.id,view:`canvas`}),deleteActive:()=>{let{workflows:n,activeId:r}=t();if(n.length<2)return;let i=n.filter(e=>e.id!==r);e({workflows:i,activeId:i[0].id})},patchActive:n=>e(Y(t(),e=>({...e,...n}))),select:n=>e(Y(t(),e=>({...e,selectedId:n}))),addKind:(n,r,i)=>{let a=ge(n,r,i);return e(Y(t(),e=>({...e,nodes:[...e.nodes,a],selectedId:a.id}))),a.id},addModelNode:(n,r,i)=>{let a=A(n.folder);if(!a)return null;let o=ge(a,r,i);return o.data.modelId=n.id,e(Y(t(),e=>({...e,nodes:[...e.nodes,o],selectedId:o.id}))),o.id},moveNode:(n,r,i)=>e(Y(t(),e=>({...e,nodes:e.nodes.map(e=>e.id===n?{...e,x:r,y:i}:e)}))),patchNode:(n,r)=>e(Y(t(),e=>({...e,nodes:e.nodes.map(e=>e.id===n?{...e,data:{...e.data,...r}}:e)}))),removeSelected:()=>{let n=ze(t()).selectedId;n&&e(Y(t(),e=>({...e,selectedId:null,nodes:e.nodes.filter(e=>e.id!==n),edges:e.edges.filter(e=>e.fromNode!==n&&e.toNode!==n)})))},setPanZoom:(n,r)=>e(Y(t(),e=>({...e,pan:n,zoom:r}))),connect:(n,r,i,a)=>{n!==i&&e(Y(t(),e=>{let t=e.nodes.find(e=>e.id===i);if(!t)return e;let o=t.kind===`prompt`&&a===`clip`,s=e.edges.filter(e=>e.toNode===i&&e.toPort===a),c=e.edges.filter(e=>e.fromNode!==n||e.fromPort!==r||e.toNode!==i||e.toPort!==a);o||(c=c.filter(e=>e.toNode!==i||e.toPort!==a)),o&&s.length>=2&&!s.some(e=>e.fromNode===n)&&(c=c.filter(e=>e.id!==s[0].id)),c=[...c,{id:T(`e`),fromNode:n,fromPort:r,toNode:i,toPort:a}];let l=(a===`positive`||a===`negative`)&&r===`cond`?e.nodes.map(e=>e.id===n&&e.kind===`prompt`?{...e,data:{...e.data,role:a===`negative`?`negative`:`positive`}}:e):e.nodes;return{...e,nodes:l,edges:c}}))},disconnectPort:(n,r,i)=>e(Y(t(),e=>({...e,edges:e.edges.filter(e=>!!(e.toNode!==n||e.toPort!==r||i&&e.fromNode!==i))}))),addJob:n=>e({jobs:[n,...t().jobs].slice(0,40)}),patchJob:(n,r)=>e({jobs:t().jobs.map(e=>e.id===n?{...e,...r}:e)}),hydrate:t=>{!t||!Array.isArray(t.workflows)||t.workflows.length===0||!Array.isArray(t.models)?e({hydrated:!0}):e({rootPath:typeof t.rootPath==`string`?t.rootPath:C,engineUrl:typeof t.engineUrl==`string`?t.engineUrl:w,linkLabel:t.linkLabel??null,models:t.models,workflows:t.workflows,activeId:t.workflows.some(e=>e.id===t.activeId)?t.activeId:t.workflows[0].id,jobs:Array.isArray(t.jobs)?t.jobs:[],hydrated:!0})}}));function Be(e){return{rootPath:e.rootPath,engineUrl:e.engineUrl,linkLabel:e.linkLabel,models:e.models,workflows:e.workflows,activeId:e.activeId,jobs:e.jobs.map(({imageUrl:e,...t})=>t)}}function Ve(){if(typeof window>`u`)return null;try{let e=localStorage.getItem(Le);if(!e)return null;let t=JSON.parse(e);return t.v===1?t:null}catch{return null}}function He(e){try{let t=JSON.stringify({v:1,...Be(e)});if(t.length>45e5){let n=Be(e);n.workflows=n.workflows.map(e=>({...e,nodes:e.nodes.map(e=>({...e,data:{...e.data,imageData:void 0,maskData:void 0}}))})),t=JSON.stringify({v:1,...n})}localStorage.setItem(Le,t)}catch{}}function Ue(){return X(e=>e.workflows.find(t=>t.id===e.activeId)??e.workflows[0])}function We(e,t,n){let r=t||1;return{x:(n.w/2-e.x)/r-120,y:(n.h/2-e.y)/r-70}}function Ge(e){let t=ge(`sampler`,460,80),n=ge(`prompt`,80,40),r=ge(`save`,780,120);return{id:T(`wf`),name:e,pan:{x:32,y:32},zoom:1,selectedId:t.id,nodes:[n,t,r],edges:[]}}var Z=t();function Ke(e){return e===`model`||e===`cond`||e===`text`?`var(--color-signal)`:e===`vae`?`var(--color-muted)`:`var(--color-fg)`}function qe(e){return e===`model`||e===`cond`||e===`text`?`bg-signal`:e===`vae`?`bg-muted`:`bg-fg`}function Je(){let e=Ue(),t=X(e=>e.models),n=X(e=>e.select),r=X(e=>e.moveNode),i=X(e=>e.patchNode),o=X(e=>e.setPanZoom),s=X(e=>e.connect),c=X(e=>e.setViewport),d=(0,_.useRef)(null),p=(0,_.useRef)(null),m=(0,_.useRef)(null),[h,v]=(0,_.useState)(null),[y,b]=(0,_.useState)(!1),[ee,x]=(0,_.useState)(!1),[S,C]=(0,_.useState)(!1),w=X(e=>e.jobs),T=(0,_.useMemo)(()=>Oe(e,t),[e,t]),te=T.issues.filter(e=>e.level===`error`);function E(){return X.getState().workflows.find(e=>e.id===X.getState().activeId)??e}function D(e,t){let n=d.current?.getBoundingClientRect(),r=E();return n?{x:(e-n.left-r.pan.x)/r.zoom,y:(t-n.top-r.pan.y)/r.zoom}:{x:0,y:0}}function O(e){m.current=e,v(e)}function ne(){let e=d.current,t=E();if(!e||t.nodes.length===0)return;let n=1/0,r=1/0,i=-1/0,a=-1/0;for(let e of t.nodes){let t=j(e.kind);n=Math.min(n,e.x),r=Math.min(r,e.y),i=Math.max(i,e.x+t.w),a=Math.max(a,e.y+t.h)}let s=(e.clientWidth-64)/Math.max(1,i-n),c=(e.clientHeight-64)/Math.max(1,a-r),l=Math.min(1.1,Math.max(.34,Math.min(s,c)));o({x:(e.clientWidth-(i-n)*l)/2-n*l,y:(e.clientHeight-(a-r)*l)/2-r*l},l)}(0,_.useEffect)(()=>{let e=d.current;if(!e)return;let t=new ResizeObserver(()=>c(e.clientWidth,e.clientHeight));return t.observe(e),c(e.clientWidth,e.clientHeight),()=>t.disconnect()},[c]),(0,_.useEffect)(()=>{let e=d.current;if(!e)return;let t=t=>{t.preventDefault();let n=E(),r=e.getBoundingClientRect(),i=Math.min(1.8,Math.max(.3,n.zoom*(t.deltaY<0?1.08:.92))),a=(t.clientX-r.left-n.pan.x)/n.zoom,s=(t.clientY-r.top-n.pan.y)/n.zoom;o({x:t.clientX-r.left-a*i,y:t.clientY-r.top-s*i},i)};return e.addEventListener(`wheel`,t,{passive:!1}),()=>e.removeEventListener(`wheel`,t)},[o,e.id]);function k(e){if(e.button!==0)return;let t=e.target;if(t.closest(`[data-nodrag]`)){let e=t.closest(`[data-node]`);e&&n(e.getAttribute(`data-node`));return}let r=t.closest(`[data-port]`);if(r){let[t,n,i,a]=(r.getAttribute(`data-port`)??``).split(`|`),o=E().nodes.find(e=>e.id===t);if(!o||n!==`out`)return;let s=M(o.kind).outputs,c=s.findIndex(e=>e.name===i),l=N(o,`out`,Math.max(0,c),s.length);O({fromNode:t,fromPort:i,kind:a,x:l.x,y:l.y,tx:l.x,ty:l.y}),e.currentTarget.setPointerCapture(e.pointerId);return}let i=t.closest(`[data-node]`);if(i){let t=i.getAttribute(`data-node`)??``;n(t);let r=E().nodes.find(e=>e.id===t);if(!r)return;let a=D(e.clientX,e.clientY);p.current={type:`node`,id:t,dx:a.x-r.x,dy:a.y-r.y},e.currentTarget.setPointerCapture(e.pointerId);return}n(null);let a=E();p.current={type:`pan`,px:e.clientX,py:e.clientY,panX:a.pan.x,panY:a.pan.y},e.currentTarget.setPointerCapture(e.pointerId)}function A(e){if(m.current){let t=D(e.clientX,e.clientY);O({...m.current,tx:t.x,ty:t.y});return}let t=p.current;if(t){if(t.type===`node`){let n=D(e.clientX,e.clientY);r(t.id,n.x-t.dx,n.y-t.dy)}else o({x:t.panX+e.clientX-t.px,y:t.panY+e.clientY-t.py},E().zoom)}}function F(e){let t=m.current;if(t){let n=document.elementFromPoint(e.clientX,e.clientY)?.closest(`[data-port]`);if(n){let[e,r,i,a]=(n.getAttribute(`data-port`)??``).split(`|`);r===`in`&&a===t.kind&&s(t.fromNode,t.fromPort,e,i)}O(null)}p.current=null}function R(e){e.preventDefault();let n=D(e.clientX,e.clientY),r=[...e.dataTransfer.files].find(e=>e.type.startsWith(`image/`));if(r){Ae(r).then(e=>{let t=X.getState().addKind(`image`,n.x-90,n.y-70);X.getState().patchNode(t,{imageName:e.name,imageData:e.data,imageWidth:e.width,imageHeight:e.height})});return}let i=e.dataTransfer.getData(`text/plain`);if(i.startsWith(`node:`)){let e=i.slice(5);X.getState().addKind(e,n.x-90,n.y-50);return}if(!i.startsWith(`model:`))return;let a=t.find(e=>e.id===i.slice(6));a&&X.getState().addModelNode(a,n.x-80,n.y-40)}async function ie(){let e=JSON.stringify(T.prompt,null,2);try{await navigator.clipboard.writeText(e),x(!0),setTimeout(()=>x(!1),1200)}catch{x(!1)}}function V(e){let t=E(),n=d.current;if(!n)return;let r=Math.min(1.8,Math.max(.3,t.zoom*e)),i=n.clientWidth/2,a=n.clientHeight/2,s=(i-t.pan.x)/t.zoom,c=(a-t.pan.y)/t.zoom;o({x:i-s*r,y:a-c*r},r)}function H(t){let n=e.edges.find(e=>e.toNode===t&&e.toPort===`image`);if(!n)return null;let r=e.nodes.find(e=>e.id===n.fromNode);return r?r.kind===`image`?r.data.imageData??null:r.kind===`sampler`?w.find(t=>t.workflowName===e.name&&t.imageUrl)?.imageUrl??null:null:null}let U=e.nodes.find(t=>t.id===e.selectedId),W=(U?.kind===`image`?U.data.imageData:null)||(U?.kind===`preview`?H(U.id):null)||w.find(t=>t.workflowName===e.name&&t.imageUrl)?.imageUrl||null;return(0,Z.jsxs)(`div`,{className:`relative h-full min-h-0`,children:[(0,Z.jsx)(`div`,{ref:d,className:`canvas-dots absolute inset-0 touch-none overflow-hidden select-none`,onPointerDown:k,onPointerMove:A,onPointerUp:F,onDragOver:e=>{e.dataTransfer.types.length&&e.preventDefault()},onDrop:R,children:(0,Z.jsxs)(`div`,{className:`absolute top-0 left-0`,style:{transform:`translate(${e.pan.x}px, ${e.pan.y}px) scale(${e.zoom})`,transformOrigin:`0 0`},children:[(0,Z.jsxs)(`svg`,{className:`pointer-events-none absolute overflow-visible`,width:`2400`,height:`1600`,children:[e.edges.map(t=>{let n=e.nodes.find(e=>e.id===t.fromNode),r=e.nodes.find(e=>e.id===t.toNode);if(!n||!r)return null;let i=M(n.kind).outputs,a=M(r.kind).inputs,o=Math.max(0,i.findIndex(e=>e.name===t.fromPort)),s=Math.max(0,a.findIndex(e=>e.name===t.toPort)),c=N(n,`out`,o,i.length),l=N(r,`in`,s,a.length),u=i[o]?.kind??`model`;return(0,Z.jsx)(Ye,{x1:c.x,y1:c.y,x2:l.x,y2:l.y,kind:u},t.id)}),h?(0,Z.jsx)(Ye,{x1:h.x,y1:h.y,x2:h.tx,y2:h.ty,kind:h.kind}):null]}),e.nodes.map(n=>{let r=j(n.kind),a=M(n.kind),o=e.selectedId===n.id,s=z(n,t),c=B(n,t),l=n.kind===`diffusion`||n.kind===`lora`||n.kind===`textEncoder`||n.kind===`vae`,u=l&&!n.data.modelId,d=H(n.id);return(0,Z.jsxs)(`article`,{"data-node":n.id,"data-selected":o,className:`studio-node absolute cursor-grab rounded-2xl border border-line bg-surface active:cursor-grabbing`,style:{left:n.x,top:n.y,width:r.w,height:r.h},children:[a.inputs.map((e,t)=>(0,Z.jsx)(`button`,{type:`button`,"data-port":`${n.id}|in|${e.name}|${e.kind}`,"aria-label":`${e.label} input`,className:`absolute -left-4 flex size-8 -translate-y-1/2 items-center justify-center`,style:{top:P(t,a.inputs.length,r.h)},children:(0,Z.jsx)(`span`,{className:`size-3.5 rounded-full ring-2 ring-bg ${qe(e.kind)}`})},e.name)),a.outputs.map((e,t)=>(0,Z.jsx)(`button`,{type:`button`,"data-port":`${n.id}|out|${e.name}|${e.kind}`,"aria-label":`${e.label} output`,className:`absolute -right-4 flex size-8 -translate-y-1/2 items-center justify-center`,style:{top:P(t,a.outputs.length,r.h)},children:(0,Z.jsx)(`span`,{className:`size-3.5 rounded-full ring-2 ring-bg ${qe(e.kind)}`})},e.name)),(0,Z.jsxs)(`div`,{className:`flex h-full flex-col overflow-hidden px-3 py-2.5`,children:[(0,Z.jsx)(`p`,{className:`text-[10px] tracking-widest text-muted uppercase`,children:re(n.kind)}),l?(0,Z.jsxs)(Qe,{label:`Weight`,value:n.data.modelId??``,onChange:e=>i(n.id,{modelId:e||void 0}),children:[(0,Z.jsx)(`option`,{value:``,children:`Choose a file`}),be(t,n.kind).map(e=>(0,Z.jsx)(`option`,{value:e.id,children:e.name},e.id))]}):(0,Z.jsx)(`h3`,{className:`mt-1 truncate text-sm font-medium ${u?`text-signal`:`text-fg`}`,children:s}),n.kind===`sampler`?(0,Z.jsxs)(Z.Fragment,{children:[(0,Z.jsx)(Qe,{label:`Mode`,value:n.data.editMode??`generate`,onChange:e=>i(n.id,{editMode:e,denoise:e===`generate`?1:n.data.denoise??.55}),children:I.map(e=>(0,Z.jsx)(`option`,{value:e.id,children:e.label},e.id))}),(0,Z.jsxs)(`div`,{className:`mt-1 grid grid-cols-2 gap-1`,children:[(0,Z.jsx)(Qe,{label:`Sampler`,value:n.data.sampler??`euler`,onChange:e=>i(n.id,{sampler:e}),children:_e.map(e=>(0,Z.jsx)(`option`,{children:e},e))}),(0,Z.jsx)(Qe,{label:`Schedule`,value:n.data.scheduler??`simple`,onChange:e=>i(n.id,{scheduler:e}),children:ve.map(e=>(0,Z.jsx)(`option`,{children:e},e))})]})]}):null,n.kind===`enhance`?(0,Z.jsxs)(Z.Fragment,{children:[(0,Z.jsx)(Qe,{label:`Server`,value:n.data.endpoint??L[0].url,onChange:e=>i(n.id,{endpoint:e}),children:L.map(e=>(0,Z.jsx)(`option`,{value:e.url,children:e.label},e.url))}),(0,Z.jsxs)(`label`,{"data-nodrag":!0,className:`mt-1 block text-[10px] text-muted`,onPointerDown:e=>e.stopPropagation(),children:[`LLM model`,(0,Z.jsx)(`input`,{className:`node-select mt-0.5`,value:n.data.llm??``,placeholder:`llama3.1 or model id`,onChange:e=>i(n.id,{llm:e.target.value})})]})]}):null,n.kind===`image`?(0,Z.jsx)($e,{src:n.data.imageData,onFile:e=>{Ae(e).then(e=>i(n.id,{imageName:e.name,imageData:e.data,imageWidth:e.width,imageHeight:e.height,maskData:void 0}))}}):null,n.kind===`preview`?d?(0,Z.jsx)(`img`,{src:d,alt:``,className:`mt-2 min-h-0 flex-1 rounded-lg object-contain`}):(0,Z.jsx)(`p`,{className:`mt-2 text-xs text-muted`,children:`Wire an image, or run the graph and wire the sampler here.`}):null,n.kind!==`preview`&&n.kind!==`image`?(0,Z.jsx)(`p`,{className:`mt-1 text-xs leading-snug text-muted ${n.kind===`prompt`?`line-clamp-3`:`line-clamp-2`}`,children:c}):null]})]},n.id)})]})}),(0,Z.jsxs)(`div`,{className:`pointer-events-none absolute top-3 right-3 left-3 flex items-start gap-2`,children:[(0,Z.jsxs)(`div`,{className:`pointer-events-auto min-w-0 flex-1 rounded-2xl border border-line bg-surface px-3 py-2`,children:[(0,Z.jsx)(`p`,{className:`text-xs tracking-widest text-muted uppercase`,children:T.ok?`Graph ready`:`Needs wiring`}),(0,Z.jsx)(`p`,{className:`mt-1 line-clamp-2 text-sm text-fg`,children:T.ok?T.summary:te[0]?.message})]}),(0,Z.jsx)(`button`,{type:`button`,onClick:()=>C(!0),className:`pointer-events-auto h-10 shrink-0 rounded-full border border-line bg-surface px-3 text-sm text-fg`,children:`Preview`}),(0,Z.jsx)(`button`,{type:`button`,onClick:()=>b(e=>!e),className:`pointer-events-auto h-10 shrink-0 rounded-full border border-line bg-surface px-3 text-sm text-fg`,children:`API graph`})]}),(0,Z.jsxs)(`div`,{className:`absolute right-4 bottom-4 flex items-center gap-1 rounded-full border border-line bg-surface p-1`,children:[(0,Z.jsx)(Xe,{label:`Zoom out`,onClick:()=>V(.9),children:(0,Z.jsx)(u,{className:`size-4`})}),(0,Z.jsxs)(`span`,{className:`w-12 text-center text-xs text-muted tabular-nums`,children:[Math.round(e.zoom*100),`%`]}),(0,Z.jsx)(Xe,{label:`Zoom in`,onClick:()=>V(1.1),children:(0,Z.jsx)(f,{className:`size-4`})}),(0,Z.jsx)(Xe,{label:`Fit workflow`,onClick:ne,children:(0,Z.jsx)(l,{className:`size-4`})})]}),(0,Z.jsx)(`p`,{className:`pointer-events-none absolute bottom-5 left-4 hidden text-xs text-muted xl:block`,children:`Drag a card to move it · Drag a node from + onto the canvas · Drop a picture to load it`}),S?(0,Z.jsx)(`div`,{className:`absolute inset-0 z-30 flex items-center justify-center bg-black/75 p-6`,onClick:()=>C(!1),children:(0,Z.jsx)(`div`,{className:`max-h-full max-w-full`,onClick:e=>e.stopPropagation(),children:W?(0,Z.jsx)(`img`,{src:W,alt:`Preview`,className:`max-h-[80vh] max-w-full rounded-2xl object-contain`}):(0,Z.jsx)(`p`,{className:`rounded-2xl bg-surface px-6 py-5 text-sm text-muted`,children:`Load an image, or run a graph. The picture opens here.`})})}):null,y?(0,Z.jsxs)(`aside`,{className:`absolute inset-y-0 right-0 z-10 flex w-full max-w-md flex-col border-l border-line bg-surface`,children:[(0,Z.jsxs)(`div`,{className:`flex items-center justify-between gap-2 border-b border-line px-4 py-3`,children:[(0,Z.jsxs)(`div`,{children:[(0,Z.jsx)(`p`,{className:`font-display text-lg text-fg`,children:`ComfyUI prompt`}),(0,Z.jsx)(`p`,{className:`text-xs text-muted`,children:T.chain.join(` → `)||`Nothing to compile yet`})]}),(0,Z.jsxs)(`div`,{className:`flex gap-1`,children:[(0,Z.jsx)(Xe,{label:`Copy graph`,onClick:ie,children:(0,Z.jsx)(a,{className:`size-4`})}),(0,Z.jsx)(Xe,{label:`Close graph`,onClick:()=>b(!1),children:(0,Z.jsx)(g,{className:`size-4`})})]})]}),ee?(0,Z.jsx)(`p`,{className:`px-4 pt-3 text-xs text-signal`,children:`Copied`}):null,(0,Z.jsx)(`ul`,{className:`space-y-1 px-4 py-3`,children:T.issues.map(e=>(0,Z.jsx)(`li`,{className:e.level===`error`?`text-sm text-signal`:`text-sm text-muted`,children:e.message},e.message))}),(0,Z.jsx)(`pre`,{className:`mx-4 mb-4 min-h-0 flex-1 overflow-auto rounded-xl bg-bg p-3 text-xs leading-relaxed text-fg`,children:JSON.stringify(Ze(T.prompt),null,2)})]}):null]})}function Ye({x1:e,y1:t,x2:n,y2:r,kind:i}){let a=Math.min(110,Math.max(48,Math.abs(n-e)*.28)),o=`M ${e} ${t} C ${e+a} ${t}, ${n-a} ${r}, ${n} ${r}`;return(0,Z.jsx)(`path`,{d:o,fill:`none`,stroke:Ke(i),strokeWidth:1.75})}function Xe({label:e,onClick:t,children:n}){return(0,Z.jsx)(`button`,{type:`button`,"aria-label":e,onClick:t,className:`flex size-10 items-center justify-center rounded-full text-fg`,children:n})}function Ze(e){let t=structuredClone(e);for(let e of Object.values(t))for(let[t,n]of Object.entries(e.inputs))typeof n==`string`&&n.startsWith(`data:image`)&&(e.inputs[t]=`[image ${Math.round(n.length/1024)} KB]`);return t}function Qe({label:e,value:t,onChange:n,children:r}){return(0,Z.jsxs)(`label`,{"data-nodrag":!0,className:`mt-1 block text-[10px] tracking-wide text-muted uppercase`,onPointerDown:e=>e.stopPropagation(),children:[e,(0,Z.jsx)(`select`,{className:`node-select mt-0.5 normal-case`,value:t,onChange:e=>n(e.target.value),children:r})]})}function $e({src:e,onFile:t}){return(0,Z.jsxs)(`label`,{"data-nodrag":!0,className:`mt-1 flex min-h-0 flex-1 cursor-pointer flex-col`,onPointerDown:e=>e.stopPropagation(),children:[e?(0,Z.jsx)(`img`,{src:e,alt:``,className:`h-24 w-full rounded-lg object-cover`}):(0,Z.jsx)(`span`,{className:`flex h-20 items-center justify-center rounded-lg border border-dashed border-line text-xs text-muted`,children:`Drop or choose`}),(0,Z.jsx)(`input`,{type:`file`,accept:`image/*`,className:`sr-only`,onChange:e=>{let n=e.target.files?.[0];n&&t(n),e.target.value=``}})]})}function et(e){return e.replace(/&/g,`&`).replace(/</g,`<`).replace(/>/g,`>`)}function tt(e){let t=et(e);return t=t.replace(/`([^`]+)`/g,`<code>$1</code>`),t=t.replace(/\*\*([^*]+)\*\*/g,`<strong>$1</strong>`),t=t.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g,(e,t,n)=>n.startsWith(`https://`)||n.startsWith(`http://`)?`<a href="${n}" target="_blank" rel="noreferrer">${t}</a>`:`<a href="${n}" data-doc="${n}">${t}</a>`),t}function nt(e){let t=e.replace(/\r\n/g,`
`).split(`
`),n=[],r=0;for(;r<t.length;){let e=t[r];if(e.startsWith("```")){let e=[];for(r+=1;r<t.length&&!t[r].startsWith("```");)e.push(et(t[r])),r+=1;n.push(`<pre><code>${e.join(`
`)}</code></pre>`),r+=1;continue}if(e.trim()===``){r+=1;continue}let i=/^(#{1,3})\s+(.*)$/.exec(e);if(i){let e=i[1].length;n.push(`<h${e}>${tt(i[2])}</h${e}>`),r+=1;continue}if(e.startsWith(`|`)){let e=[];for(;r<t.length&&t[r].startsWith(`|`);){let n=t[r].split(`|`).slice(1,-1).map(e=>e.trim());n.every(e=>/^:?-+:?$/.test(e))||e.push(n),r+=1}let i=e[0]??[],a=e.slice(1);n.push(`<div class="docs-table"><table><thead><tr>${i.map(e=>`<th>${tt(e)}</th>`).join(``)}</tr></thead><tbody>${a.map(e=>`<tr>${e.map(e=>`<td>${tt(e)}</td>`).join(``)}</tr>`).join(``)}</tbody></table></div>`);continue}if(e.startsWith(`- `)){let e=[];for(;r<t.length&&t[r].startsWith(`- `);)e.push(`<li>${tt(t[r].slice(2))}</li>`),r+=1;n.push(`<ul>${e.join(``)}</ul>`);continue}if(/^\d+\.\s/.test(e)){let e=[];for(;r<t.length&&/^\d+\.\s/.test(t[r]);)e.push(`<li>${tt(t[r].replace(/^\d+\.\s/,``))}</li>`),r+=1;n.push(`<ol>${e.join(``)}</ol>`);continue}let a=[e];for(r+=1;r<t.length&&t[r].trim()!==``&&!/^(#{1,3}\s|```|\| |- |\d+\.\s)/.test(t[r]);)a.push(t[r]),r+=1;n.push(`<p>${tt(a.join(` `))}</p>`)}return n.join(``)}var rt=[{id:`README.md`,label:`Read me`,source:`# LocGENStudio

**0.10.0.** A local generative studio for Windows 11.

You wire a graph on the canvas. The engine on this PC loads the weights you already have and samples on the GPU that \`pythonembedded\` can see. Diffusion models, LoRAs, text encoders, VAEs, and checkpoints stay in one models folder, in the same layout a local engine expects. The studio sends filenames and sampler settings. It does not upload the files. A browser preview cannot see the GPU. A real image shows up only after the starter is listening on this machine.

Built-in graphs cover Flux, Flux Schnell, Flux 2 Klein, Krea 2, Qwen Image 2.1, Z-Image, SDXL, SD 1.5, Wan 2.2, LTX 2.5, and MiniMax H3. Open **Graphs** and start from one of those instead of wiring the loaders by hand.

The Windows package for this version is [v0.10.0](https://github.com/vinodkvijayan/LocGENStudio/releases/tag/v0.10.0). \`LocGENStudio.exe\` is the whole app: the studio, the engine, and — once packed — Python and the inference libraries. Model weights are the only files it does not contain.

## One exe

Double-click [LocGENStudio.exe](https://github.com/vinodkvijayan/LocGENStudio/releases/tag/v0.10.0). It opens the studio in the browser and listens on \`http://127.0.0.1:8188\`. A console window stays open while it runs. Close that window to stop it.

Models are not in the exe. It uses \`models\` next to the exe if that folder exists, otherwise \`C:\\LocGENStudio\\models\`. Output is the \`output\` folder beside the models root.

The exe on the release contains the studio and the engine. It uses \`pythonembedded\` next to the exe, or \`C:\\LocGENStudio\\pythonembedded\`, if you already have one. To put Python, PyTorch and diffusers **inside** the exe so a second machine only needs the models:

\`\`\`
powershell -ExecutionPolicy Bypass -File .\\Build-LocGENStudioExe.ps1
\`\`\`

That script downloads embeddable Python and the CUDA 12.8 PyTorch wheel when \`pythonembedded\` is missing, then writes a new \`LocGENStudio.exe\`. The result is several gigabytes. GitHub cannot host a file that size, so the packed exe stays on the machine that built it. Copy that exe anywhere. Do not copy the models into it.

An RTX 4060 Ti and an RTX 5060 both run the cu128 wheel. The driver has to be new enough for CUDA 12.8.

## Screenshots

**Flux portrait.** CLIP-L, T5-XXL, a LoRA, and a 1024 latent.

![Flux portrait graph](docs/screenshots/canvas.png)

**Graphs.** Each family has a starting graph.

![Graph menu with Flux, Krea 2, Qwen Image 2.1, Z-Image, Wan 2.2, LTX 2.5, and MiniMax H3](docs/screenshots/graphs.png)

**Krea 2.** One Qwen3-VL encoder, the Krea diffusion file, and the Qwen image VAE.

![Krea 2 graph](docs/screenshots/krea.png)

**Wan 2.2.** A video latent: 832×480, 49 frames, UMT5, and the Wan VAE.

![Wan 2.2 graph](docs/screenshots/wan.png)

**Library.** Point the studio at a models root, then place a weight on the canvas.

![Model library beside the canvas](docs/screenshots/library.png)

**Windows.** The models root, the engine URL, and the starter.

![Windows setup](docs/screenshots/windows.png)

## Edit a picture

Drop a picture on the canvas, or add an Image card and choose a file. Set the sampler dropdown to **Edit image**, **Inpaint**, or **Outpaint**, and wire the image into the sampler.

- **Edit** is img2img. Denoise is how far the model may move from the picture.
- **Inpaint** changes only the area you paint. Select the image card and paint in the inspector. Pale green is the mask.
- **Outpaint** grows the frame by the padding on the sampler, then fills the new area.

**Preview** opens the selected picture, or the latest result of this graph. A Preview card shows whatever image is wired into it. Drag a card to move it. Drag a node from **+** onto the canvas. Diffusion, LoRA, text encoder, VAE, and sampler cards have dropdowns for the file, the sampler, and the schedule.

A **Prompt enhancer** takes a system prompt, the prompt to rewrite, and an LLM model name. Point it at Ollama (\`http://127.0.0.1:11434/v1\`) or LM Studio (\`http://127.0.0.1:1234/v1\`). Wire its text output into a prompt. An optional image input is sent when the model can see pictures. The engine calls that server when you press Run.

**Graphs → New image edit** starts that layout. SDXL checkpoints are the reliable path for edit, inpaint, and outpaint. Other families need the matching img2img or inpaint class in the diffusers build inside \`pythonembedded\`.

## Layout

\`\`\`
C:\\LocGENStudio\\
  pythonembedded\\python.exe
  engine\\main.py
  models\\
    diffusion_models\\
    loras\\
    text_encoders\\
    vae\\
    clip\\
    checkpoints\\
  output\\
\`\`\`

\`python_embeded\` is accepted as well. That is the spelling used by some portable runtimes.

The default models root is \`C:\\LocGENStudio\\models\`. Output is the sibling folder \`C:\\LocGENStudio\\output\`.

## What a run actually does

1. You pick weights in the library, or import \`locgen-manifest.json\`.
2. The canvas compiles a prompt graph: loaders, text encode, latent, sampler, VAE decode, save.
3. The browser posts that graph to \`http://127.0.0.1:8188\`.
4. The engine loads the named files from the models root and samples.
5. The image comes back to Runs. The same PNG is written under \`output\\\`.

Sample-library files are refused. A graph that still points at the built-in names will not be queued.

## Families

| Family | Kind of file | Text encoder | VAE |
|---|---|---|---|
| Flux | \`diffusion_models\` | CLIP-L and T5-XXL | \`ae.safetensors\` |
| Flux Schnell | same | same | same, 4 steps, CFG 1 |
| Flux 2 Klein | \`diffusion_models\` | one Qwen3 | \`flux2-vae\` |
| Krea 2 | \`diffusion_models\` | Qwen3-VL 4B | \`qwen_image_vae\` |
| Qwen Image 2.1 | \`diffusion_models\` | Qwen3-VL 8B | \`qwen_image_2.1_vae\` |
| Z-Image | \`diffusion_models\` | Qwen3 | Qwen image VAE |
| SDXL / SD 1.5 | \`checkpoints\` | inside the checkpoint | inside, or an override in \`vae\\\` |
| Wan 2.2 | \`diffusion_models\` | UMT5-XXL | Wan video VAE |
| LTX 2.5 | \`diffusion_models\` | Gemma | LTX video VAE |
| MiniMax H3 | \`diffusion_models\` | Qwen3-VL for H3 | H3 video VAE |

Open **Graphs** for a starting graph of each family. Details, filenames, and step counts are in [docs/families.md](docs/families.md).

## Docs

| Guide | What it answers |
|---|---|
| [HOWTO.md](HOWTO.md) | First install through the first real image |
| [NOTES.md](NOTES.md) | Limits, licenses, VRAM, what is not sampled |
| [docs/models.md](docs/models.md) | Folder tree, aliases, the manifest |
| [docs/families.md](docs/families.md) | One section per model family |
| [docs/graph.md](docs/graph.md) | Nodes, ports, and how a graph is compiled |
| [docs/engine.md](docs/engine.md) | The Python process and the HTTP API |
| [docs/windows.md](docs/windows.md) | What the starter script does |
| [docs/troubleshooting.md](docs/troubleshooting.md) | Engine offline, missing files, bad jobs |

The same pages are in the studio under **Docs**.

## Requirements

- Windows 11
- A GPU that PyTorch in \`pythonembedded\` can use. CPU sampling is possible and slow.
- Inside \`pythonembedded\`: torch, diffusers, transformers, safetensors, accelerate, pillow. The list is \`engine/requirements.txt\`.
- A current diffusers for the newer families. Qwen Image 2.1, single-file Krea 2, and single-file MiniMax H3 need about diffusers 0.41. Older builds still compile the graph and return a clear error naming the missing pipeline.
- Edge or Chrome if you want to link the models folder directly. Any browser can import the manifest instead.

## First hour

Follow [HOWTO.md](HOWTO.md). Short form:

1. On the Windows tab, download the engine and unzip it so \`engine\\main.py\` sits next to \`pythonembedded\`.
2. Download the starter and run it. It creates the models tree, writes \`locgen-manifest.json\`, and starts the engine.
3. Put weights in the folders. Run the starter again so the manifest includes them.
4. Import the manifest. Open a graph. Replace the sample names with your files. Press Run.
`},{id:`HOWTO.md`,label:`How to`,source:`# How to run LocGENStudio

This is the path from an empty Windows 11 machine to an image written by your GPU. Stay in this order. Skipping the starter is the usual reason Run cannot reach the engine.

## 1. Make the folder

Create \`C:\\LocGENStudio\`. You can use another disk. If you do, set that path as the model root on the Windows tab before you download the starter. The starter’s \`-Root\` is the models folder, not the studio folder. The studio folder is the parent.

\`\`\`
C:\\LocGENStudio\\          studio folder
C:\\LocGENStudio\\models\\   model root, the -Root argument
\`\`\`

## 2. Install the embedded Python

LocGENStudio does not download Python for you. Put a Windows embeddable runtime here:

\`\`\`
C:\\LocGENStudio\\pythonembedded\\python.exe
\`\`\`

\`python_embeded\` (one d) is also accepted.

Install the libraries into that runtime, not into a system Python:

\`\`\`
pythonembedded\\python.exe -m pip install -r engine\\requirements.txt
\`\`\`

\`engine\\requirements.txt\` lists torch, diffusers, transformers, safetensors, accelerate, and pillow. Install a CUDA build of torch that matches your driver. A CPU-only torch will sample on the CPU.

For Krea 2, Qwen Image 2.1, Z-Image, Wan 2.2, LTX 2.5, MiniMax H3, and Flux 2 Klein, use a current diffusers. The 0.41 line is the one that covers Qwen Image 2.1 and the single-file loaders for Krea 2 and MiniMax H3.

## 3. Unzip the engine

On the Windows tab, download the engine. Unzip it so the tree looks like this:

\`\`\`
C:\\LocGENStudio\\engine\\main.py
C:\\LocGENStudio\\engine\\locgen\\
C:\\LocGENStudio\\engine\\requirements.txt
\`\`\`

Do not nest a second \`engine\` folder inside \`engine\`. The starter looks for \`engine\\main.py\` next to \`pythonembedded\`.

## 4. Run the starter

On the Windows tab, download \`Start-LocGENStudio.ps1\`. Right-click, Run with PowerShell, or:

\`\`\`
powershell -ExecutionPolicy Bypass -File .\\Start-LocGENStudio.ps1 -Root 'C:\\LocGENStudio\\models'
\`\`\`

The script:

- creates the models subfolders
- scans weights, including a few alias folder names if you already made them
- writes \`models\\locgen-manifest.json\`
- starts \`pythonembedded\\python.exe -s engine\\main.py --models <root> --listen 127.0.0.1 --port 8188\`

Leave that window open. Closing it stops sampling.

The engine prints the model root, the output folder, and the listen address. \`Check engine\` on the Windows tab should then name the GPU.

## 5. Put weights in the right folders

| You have | Put it in |
|---|---|
| Flux, Krea 2, Qwen, Z-Image, Klein, Wan, LTX, MiniMax diffusion file | \`models\\diffusion_models\` |
| SDXL or SD 1.5 single checkpoint | \`models\\checkpoints\` |
| LoRA | \`models\\loras\` |
| VAE | \`models\\vae\` |
| CLIP, T5, UMT5, Qwen, Gemma | \`models\\text_encoders\` |

\`text-encoder\` and the misspelling \`diffussion_models\` are read if those folders already exist. The starter does not create the misspelled names. Prefer the canonical folders.

Run the starter again after adding files if you want a fresh manifest. Restarting also reloads the engine.

## 6. Point the studio at the files

Two ways:

- **Import manifest.** Windows tab, Import manifest, choose \`C:\\LocGENStudio\\models\\locgen-manifest.json\`. This works in any browser.
- **Link folder.** Windows tab, Link folder on this PC. This needs Edge or Chrome, because it uses the File System Access API. The browser remembers the permission for later visits.

The library should list your filenames, sizes, and a family guess. If every card still says the sample library, you have not imported or linked yet. Run will refuse those sample names.

## 7. Build or open a graph

**Graphs** has a template for each family. Choosing one adds any missing sample cards so the graph is wired, then you swap in your real files on each node.

A still-image graph is:

\`\`\`
text encoder  ->  prompt  ->  sampler  ->  save
diffusion     ----------------^
vae           ----------------^
\`\`\`

Flux is the exception. It wants two text encoders, CLIP-L and T5-XXL, both wired into the positive prompt.

Select a node. The inspector on the right (or Edit on a phone) is where the file, steps, CFG, size, batch, and frames live.

The status line under the title should say **Graph ready** and name the diffusion file. If it names a missing encoder or VAE, the graph will not queue.

## 8. Press Run

Run checks three things before it sends the graph:

1. The graph compiles.
2. Every chosen file is a real library entry, not a sample card.
3. \`http://127.0.0.1:8188/system_stats\` answers.

Then it posts the prompt and polls until the image is ready, or for about five minutes. The status moves through loading weights, waiting, and sampling. Failures show the engine’s message, not a generic one.

The image lands in Runs and in \`C:\\LocGENStudio\\output\`, under the save prefix (\`locgen\\flux\`, \`locgen\\krea2\`, and so on).

## 9. Swap a template onto your files

1. Open the template.
2. Select the diffusion node. Choose your file from the list.
3. Select the text encoder node. Choose the matching encoder.
4. Select the VAE node. Choose the matching VAE.
5. Edit the prompt.
6. Run.

Family is guessed from the filename. \`krea2\`, \`qwen_image_2.1\`, \`z_image\`, \`wan2.2\`, \`ltx-2.5\`, \`minimax_h3\`, \`flux-2\` or \`klein\`, and \`flux\` are recognized. If a name is unusual, set the family when you add the file by hand in the library.

## A known-good first still

Use a Flux file you already trust, or Krea 2 turbo if that is what you have.

Krea 2 turbo, if the weights are the usual Comfy-style set:

- diffusion: \`krea2_turbo\` in \`diffusion_models\`
- text encoder: \`qwen3vl_4b\` in \`text_encoders\`
- VAE: \`qwen_image_vae.safetensors\` in \`vae\`
- 8 steps, CFG 1, 1024×1024, euler / simple

Qwen Image 2.1:

- diffusion: \`qwen_image_2.1\` in \`diffusion_models\`
- text encoder: \`qwen3vl_8b\` in \`text_encoders\`
- VAE: \`qwen_image_2.1_vae\` in \`vae\`
- 20 steps, CFG 1, 1328×1328 is a square that suits it

SDXL:

- one file in \`checkpoints\`
- no separate text encoder
- 28 steps, CFG around 6, 1024×1024

## Video

Wan 2.2, LTX 2.5, and MiniMax H3 use the Frames field. The template starts at 49 frames. Runs shows the first frame. The file is still a PNG in \`output\\\`. These models are large. Read the VRAM notes before queuing a long clip.

## Where the pieces are in the studio

| Tab | Use it for |
|---|---|
| Canvas | The graph, Run, and the node inspector |
| Library | Search, add a file by name, drag a weight onto the canvas |
| Runs | Status, the returned image, the prompt JSON |
| Windows | Model root, engine URL, manifest, starter, engine zip |
| Docs | These guides |
`},{id:`NOTES.md`,label:`Notes`,source:`# Notes

Read this before you treat a template as a promise about VRAM, licenses, or video files.

## The studio and the engine are different programs

The studio is the graph editor in the browser. It stores the library, the graphs, and the run history in \`localStorage\` under the key \`locgen-studio-v1\`. That data stays in the browser profile. It is not an account and it does not sync.

The engine is a Python process on the PC. It is the only part that opens weight files. If the engine is not running, the canvas still compiles and Runs explains that the browser could not reach \`127.0.0.1:8188\`.

A hosted preview of the studio cannot see your GPU and cannot read \`C:\\LocGENStudio\`. Use the studio against the engine on the same machine.

## Sample cards are not weights

The library ships with named samples so a graph can be wired before any scan. Those entries are marked as samples. Run blocks them on purpose. Import the manifest or link the folder, then pick the files that were actually found on disk.

Choosing a template adds sample cards only for files the graph needs and that are not already in the library. It does not delete a library you already imported.

## What is sampled

The engine executes this node set:

- \`UNETLoader\`, \`CheckpointLoaderSimple\`
- \`DualCLIPLoader\`, \`CLIPLoader\`
- \`LoraLoader\`
- \`VAELoader\`
- \`CLIPTextEncode\`, \`FluxGuidance\`
- \`EmptyLatentImage\`, \`EmptySD3LatentImage\`
- \`EmptyHunyuanLatentVideo\`, \`EmptyLTXVLatentVideo\`
- \`KSampler\`, \`VAEDecode\`, \`SaveImage\`

Flux dev and schnell go through a Flux pipeline: diffusion file, CLIP-L, T5, and \`ae.safetensors\`. If guidance is above 1, the graph adds \`FluxGuidance\` and the sampler CFG is sent as 1.

SDXL and SD 1.5 load with the checkpoint pipeline. A VAE node, if you wire one, replaces the VAE packed in the checkpoint.

Krea 2, Qwen Image, Z-Image, Flux 2 Klein, Wan, LTX, MiniMax, and Hunyuan go through the matching diffusers pipeline when that class exists in \`pythonembedded\`. The loader tries the pipeline’s single-file entry first, then the transformer’s single-file entry plus the VAE and text encoder.

## What is not sampled

These folders are scanned and shown so the library matches a Comfy-style tree. The graph runner does not execute them:

- ControlNet, IP-Adapter, CLIP vision, style models
- upscale models, hypernetworks, GLIGEN, PhotoMaker
- embeddings (you can still type the embedding name into a prompt on SD 1.5-style runs, if the checkpoint pipeline understands it)
- audio VAEs and audio encoders
- \`model_patches\` and latent upscalers

GGUF names are indexed. Sampling expects a single-file load that diffusers understands, which in practice means safetensors or ckpt. A GGUF diffusion file will fail at load time with the pipeline error, not with a fake image.

One job runs at a time. The next waits on the engine queue.

## Video comes back as a still

Wan, LTX, and MiniMax compile as video graphs. The latent length is the Frames value. The pipeline is asked for that many frames. Runs displays the first frame, saved as a PNG. There is no timeline in the studio and no audio mux. Use Frames for length, not Batch. Batch is a batch of clips, and it multiplies VRAM.

MiniMax H3 in the wild is often a first-and-last-frame or reference clip model. The template is a text-to-video graph. If your file is the FL2VA or Ref2VA variant, a text-only run may be the wrong graph for that checkpoint. The job error will come from the loader or the pipeline, not from the canvas pretending it worked.

## Text encoders that are a single safetensors

CLIP-L and T5 have small configs in the engine, so a lone \`.safetensors\` can be loaded for Flux.

Qwen3-VL and Gemma do not. If the diffusion pipeline cannot open the diffusion file by itself, the engine asks you to place that encoder as a folder containing \`config.json\` and the tokenizer, next to the weights. A single \`qwen3vl_8b.safetensors\` with no tokenizer will not be guessed into a working encoder.

Some releases also ship a tokenizer directory beside the safetensors. Keep it. The Flux path looks for \`text_encoders\\clip_tokenizer\` and \`text_encoders\\t5_tokenizer\`.

## LoRAs

A LoRA node sits on the model line between the diffusion loader and the sampler. Strength is model strength and CLIP strength. The engine applies the file with the diffusers LoRA loader.

Many LoRAs that were trained for a Comfy graph use key names diffusers does not map. Those fail on the job, with the exception text. A failure is not a silent skip. Body-only or style LoRAs for Krea 2 and Flux belong in \`loras\\\` and on a LoRA node of a graph for that same family.

## Licenses sit on the weights

LocGENStudio does not grant a license to any model. The file you downloaded keeps the license it shipped with.

Pay attention in particular to:

- Qwen Image 2.1 is commonly distributed under the Qwen Research License, which is not a general commercial grant. Read the license next to the weights before you publish the output.
- Flux dev has its own non-commercial terms. Schnell is a different license. Do not assume they match.
- Krea 2, Wan, LTX, MiniMax, and Z-Image each have their own terms.

The sample names in the library are labels, not copies of those weights, and they are not a redistribution.

## VRAM, roughly

These are planning numbers, not measurements on your card. Offload is enabled when CUDA is present, and the VAE is tiled when the pipeline allows it. That lowers the peak and raises the time.

| Setup | What usually fits |
|---|---|
| 8 GB | SD 1.5. SDXL is tight. Flux and the 2026 models generally do not. |
| 12 GB | SDXL. Flux schnell in fp8 sometimes, with offload and patience. |
| 16 GB | Flux fp8, Krea 2 turbo, Z-Image turbo, Qwen Image 2.1 in the int8 pack. Wan and LTX at modest frames. |
| 24 GB and up | Flux fp16, longer video, MiniMax H3 more comfortably. |

Qwen3-VL 8B plus a diffusion file is two large loads. The int8 and fp8 packs exist because the bf16 pair does not fit a 16 GB card. MiniMax’s 32B text encoder is larger still.

If a run dies in the engine window with an out-of-memory message, lower frames, lower resolution, or switch to the quantized file. The studio does not catch CUDA OOM before it happens.

## Time

The browser gives up after about five minutes of polling (150 checks, two seconds apart). A first Flux load on a cold cache can spend most of that in weight loading. If the engine window is still sampling, the PNG still appears in \`output\\\` even when Runs says the engine is still working. Raise nothing in the browser. Wait, then open the output folder.

## Filenames and family detection

Detection is by name, in this order: Krea 2, Z-Image, MiniMax, LTX, Flux 2 / Klein, Qwen, Flux, Wan / UMT5, Hunyuan, SD3, SDXL, SD 1.5, Gemma as LTX, T5 as Flux.

So \`umt5\` is Wan, not Flux. \`flux-2-klein\` is Klein, not Flux 1. \`qwen3vl\` on a text encoder is Qwen even when you use it for Krea 2. That is fine. The diffusion file decides the pipeline. The text encoder is just the file you wired.

\`xl\` inside a later token will not steal a file that already matched Qwen or LTX. A checkpoint whose name contains \`xl\` is SDXL.

## Security of the engine

The engine listens on \`127.0.0.1\` only, with open CORS so the page can call it. It will not read a path that contains \`..\` or an absolute path inside a filename. \`/view\` only serves files under the output directory.

Do not expose port 8188 to your LAN. Anyone who can post to it can run your GPU and read output images.

## Browser storage

Clearing site data drops graphs and the library index. It does not touch the models folder or \`output\\\`. Export is the manifest on disk, which is the thing worth keeping. Graphs themselves are only in the browser.

The engine URL defaults to \`http://127.0.0.1:8188\`. Change it on the Windows tab if you started the engine on another port. Pass the same port to the starter as \`-Port\`.

## Diffusers mismatch

A graph can be valid while the installed diffusers is too old. The job text names the pipeline class it looked for, for example \`QwenImage21Pipeline\` or \`Krea2Pipeline\`. Upgrade diffusers inside \`pythonembedded\` and start the engine again. You do not need a new studio graph.

## Not a ComfyUI install

The starter used to look for a separate ComfyUI checkout. It no longer does. The process that must be running is \`engine\\main.py\`. Node class names match the ones the canvas has always compiled, so the prompt JSON is familiar if you have used those loaders. The implementation is LocGENStudio’s, and it only runs the node set listed above.
`},{id:`docs/models.md`,label:`Models folder`,source:`# Models folder

One root. Every weight the engine is allowed to open lives under it. The default root is \`C:\\LocGENStudio\\models\`.

The engine resolves a filename only inside the folder for that loader, plus a short alias list. A path with \`..\`, or an absolute path sent as a name, is rejected.

## Tree

\`\`\`
models\\
  checkpoints\\          SD 1.5 and SDXL full checkpoints
  diffusion_models\\     Flux, Flux 2, Krea 2, Qwen, Z-Image, Wan, LTX, MiniMax, SD3, Hunyuan
  unet\\                 legacy twin of diffusion_models
  loras\\
  vae\\
  text_encoders\\        CLIP, T5, UMT5, Qwen, Gemma
  clip\\                 older text-encoder folder, still scanned
  clip_vision\\
  embeddings\\
  controlnet\\
  upscale_models\\
  hypernetworks\\
  style_models\\
  ipadapter\\
  vae_approx\\
  gligen\\
  photomaker\\
  audio_encoders\\
  configs\\
  locgen-manifest.json  written by the starter, not a weight
\`\`\`

Extensions that count as weights: \`.safetensors\`, \`.ckpt\`, \`.pt\`, \`.pth\`, \`.bin\`, \`.gguf\`, \`.sft\`.

Files may sit in a subfolder. The name stored in the manifest is the path relative to that family folder, with forward slashes. \`diffusion_models\\flux\\dev.safetensors\` is the name \`flux/dev.safetensors\`.

## Aliases

These folder names are recognized if you already have them. They are mapped onto the canonical folder. The starter scans them and does not create them.

| On disk | Treated as |
|---|---|
| \`text-encoder\`, \`text_encoder\` | \`text_encoders\` |
| \`diffussion_models\`, \`diffusion-models\` | \`diffusion_models\` |

When the engine loads a diffusion file it also looks in \`unet\` if the file is not in \`diffusion_models\`. When it loads a text encoder it also looks in \`clip\`.

## What each loader reads

| Node | Folder |
|---|---|
| \`CheckpointLoaderSimple\` | \`checkpoints\` |
| \`UNETLoader\` | \`diffusion_models\`, then \`unet\` |
| \`DualCLIPLoader\`, \`CLIPLoader\` | \`text_encoders\`, then \`clip\` |
| \`VAELoader\` | \`vae\` |
| \`LoraLoader\` | \`loras\` |

The other folders exist so a scan of a Comfy-style tree does not drop files on the floor. See [NOTES.md](../NOTES.md) for which of them are not executed.

## Manifest

\`locgen-manifest.json\` is the index the studio can import without a folder permission.

\`\`\`json
{
  "app": "LocGENStudio",
  "root": "C:\\\\LocGENStudio\\\\models",
  "generatedAt": "2026-10-17T12:00:00+05:30",
  "models": [
    { "name": "krea2_turbo_fp8.safetensors", "folder": "diffusion_models", "bytes": 8200000000 }
  ]
}
\`\`\`

\`folder\` may be a canonical name or an alias. Unknown folders are skipped. Family is guessed from the filename when the manifest does not set one.

Importing sets the model root shown on the Windows tab when \`root\` is present. The engine does not read the manifest. The manifest is only for the studio. The engine reads the directories.

## Output

Images are written next to the models root, not inside it:

\`\`\`
C:\\LocGENStudio\\output\\<prefix>\\
\`\`\`

The save node’s prefix becomes the subfolder. \`locgen/krea2\` writes \`output\\locgen\\krea2_00001.png\` style names: the prefix’s parent is the subfolder, and a counter is appended to the last segment. Characters that would escape the output directory are dropped and the prefix becomes \`locgen\`.

You can point output somewhere else by starting the engine with \`--output\`. The starter does not. It uses the default, the parent of the models root plus \`\\output\`.

## Adding a file the scan missed

Library, bottom of the list, type the filename, pick the folder, and optionally the family. Guess is usually right. Use this when the manifest is stale and you do not want to rescan yet. The engine still has to find that exact name on disk at run time. An invented name fails with “is not under diffusion_models/” (or whichever folder the loader uses).

## Presets

The Windows tab offers four roots as shortcuts:

- \`C:\\LocGENStudio\\models\`
- a portable Comfy tree
- \`C:\\ComfyUI\\models\`
- a Stability Matrix package models folder

Those shortcuts only fill the path used for the starter download. They do not move files. If you point the starter at an existing Comfy models folder, it creates any missing canonical subfolders there and writes the manifest beside the weights. Your existing files stay where they are.
`},{id:`docs/families.md`,label:`Families`,source:"# Families\n\nThe diffusion filename picks the family. The graph then asks for the text encoder type and the latent that family expects. Swapping a Qwen file into a Flux graph, or a Flux file into a Krea graph, compiles the wrong loader. Change the diffusion file and use the matching template, or rewire the text encoder and VAE.\n\nTemplates live under **Graphs**. Steps and CFG below are the template defaults, not a claim that every finetune wants them.\n\n## Flux\n\nFiles: `flux1-dev`, `flux1-schnell`, and other names containing `flux` but not `flux-2` or `klein`.\n\n| Slot | Where | Typical file |\n|---|---|---|\n| Diffusion | `diffusion_models` | `flux1-dev-fp8.safetensors` |\n| CLIP-L | `text_encoders` | `clip_l.safetensors` |\n| T5-XXL | `text_encoders` | `t5xxl_fp8_e4m3fn.safetensors` |\n| VAE | `vae` | `ae.safetensors` |\n\nBoth encoders must be wired into the positive prompt. The compiler emits `DualCLIPLoader` with type `flux`. With CFG above 1 it inserts `FluxGuidance` and sets the sampler CFG to 1. That is the Flux dev pattern. Schnell stays at CFG 1 and 4 steps, and does not need guidance.\n\nDev and schnell are different licenses. See [NOTES.md](../NOTES.md).\n\nLoRAs trained on Flux go on a LoRA node between the diffusion loader and the sampler.\n\n## Flux 2 Klein\n\nNames containing `flux-2`, `flux_2`, `flux2`, or `klein`.\n\n| Slot | Typical file |\n|---|---|\n| Diffusion | `flux-2-klein-9b.safetensors` (4B exists too) |\n| Text encoder | one Qwen3, `qwen_3_8b` or `qwen_3_4b` matched to the size |\n| VAE | `flux2-vae.safetensors` |\n\nOne encoder. `CLIPLoader` type `flux2`. The template is 4 steps, CFG 1, 1024×1024. There is no second CLIP-L tower and no Flux guidance node.\n\n## Krea 2\n\nNames containing `krea2`, `krea-2`, or `krea 2`.\n\n| Slot | Typical file |\n|---|---|\n| Diffusion | `krea2_turbo_….safetensors` or `krea2_raw_….safetensors` |\n| Text encoder | `qwen3vl_4b_….safetensors` |\n| VAE | `qwen_image_vae.safetensors` |\n\n`CLIPLoader` type `krea2`. Turbo is the distilled checkpoint: 8 steps, CFG 1. The raw checkpoint wants more steps. The template assumes turbo. If you load the raw file, raise steps before you judge the model.\n\nThe VAE is the Qwen image VAE, not `ae.safetensors`.\n\n## Qwen Image 2.1\n\nNames containing `qwen`. This also matches older Qwen Image files. The pipeline class tried first is `QwenImage21Pipeline`, then `QwenImagePipeline`.\n\n| Slot | Typical file |\n|---|---|\n| Diffusion | `qwen_image_2.1_bf16` or `qwen_image_2.1_int8_convrot` |\n| Text encoder | `qwen3vl_8b_bf16` or `qwen3vl_8b_int8_convrot` |\n| VAE | `qwen_image_2.1_vae_bf16.safetensors` |\n\n`CLIPLoader` type `qwen_image`. Template: 20 steps, CFG 1, 1328×1328. A turbo LoRA, when you have one, is a LoRA node at strength 1, with steps around 8 and CFG 1. The base model is happier with more steps than the turbo path.\n\nPrompt-enhancer weights (`qwen3.5_9b_…_pe_`) are not the diffusion file and not the 8B encoder. Do not put them on the diffusion node.\n\nThe Qwen Research License is the usual grant on these weights. Read it.\n\nSquare sizes that stay on a 16-pixel lattice and are known to behave: 1328, and the 1664×928 / 928×1664 pair. The sampler will accept other sizes. The model may not like them.\n\n## Z-Image\n\nNames containing `z-image`, `z_image`, or `zimage`.\n\n| Slot | Typical file |\n|---|---|\n| Diffusion | `z_image_turbo_….safetensors` |\n| Text encoder | a Qwen3 encoder, often the 4B |\n| VAE | the VAE that shipped with the release; the template uses the Qwen image VAE as a stand-in label |\n\n`CLIPLoader` type `qwen_image`, because the text tower is a Qwen encoder. Template: 8 steps, CFG 1, 1024×1024. Turbo is a distilled model. Extra steps past the distilled budget rarely help and sometimes hurt.\n\nThe pipeline class is `ZImagePipeline`.\n\n## SDXL and SD 1.5\n\nThese are checkpoints, not diffusion-folder files.\n\n| Family | How a name matches | Loader |\n|---|---|---|\n| SDXL | `sdxl`, `juggernaut`, or `xl` as its own token | `CheckpointLoaderSimple` |\n| SD 1.5 | `sd15`, `1.5`, `v1-5` | `CheckpointLoaderSimple` |\n\nCLIP and VAE ride inside the file. You can still wire a VAE node. You usually do, for a finetune that was trained on a specific VAE. Wiring text encoders replaces the checkpoint CLIP. Leaving them off is the normal SDXL graph.\n\nTemplate for SDXL base: 28 steps, CFG 6, `dpmpp_2m` / `karras`, 1024×1024.\n\n## SD3\n\nNames containing `sd3`. Treated as a diffusion-folder model with a dual text encoder when you wire two files, type `sd3`. Guidance follows the Flux pattern when CFG is above 1. The engine’s dedicated sampler path for SD3 is the modern pipeline table only if the filename did not fall through to another family. A plain SD3 checkpoint in `checkpoints` is loaded as a checkpoint, not as Flux.\n\n## Wan 2.2\n\nNames containing `wan`, and UMT5 text encoders.\n\n| Slot | Typical file |\n|---|---|\n| Diffusion | `wan2.2_t2v_….safetensors` |\n| Text encoder | `umt5_xxl_….safetensors` |\n| VAE | `wan_2.1_vae.safetensors` (2.2 still uses this VAE in most packs) |\n\n`CLIPLoader` type `wan`. Latent node `EmptyHunyuanLatentVideo`. Template: 20 steps, CFG 5, 832×480, 49 frames.\n\nHigh-noise and low-noise pairs exist in Wan 2.2 packs. The template loads the one file you select. It does not chain the two-stage expert schedule by itself. If your pack documents a two-model graph, this template is the single-file version.\n\n## LTX 2.5\n\nNames containing `ltxv`, `ltx-2`, `ltx_2`, `ltx2`, and Gemma encoders.\n\n| Slot | Typical file |\n|---|---|\n| Diffusion | `ltx-2.5-22b-distilled-….safetensors` |\n| Text encoder | `gemma…ltx-2.5….safetensors` |\n| VAE | `ltx-2.5-video-vae-bf16.safetensors` |\n\n`CLIPLoader` type `ltxv`. Latent node `EmptyLTXVLatentVideo`. Template: 8 steps, CFG 1, 768×448, 49 frames, because the distilled checkpoint is the one most people run.\n\nAn audio VAE is a separate file in the full pack. The studio samples the picture and keeps the first frame. It does not mux audio.\n\nThe pipeline class tried first is `LTX2Pipeline`, then `LTXPipeline`.\n\n## MiniMax H3\n\nNames containing `minimax` or `hailuo`.\n\n| Slot | Typical file |\n|---|---|\n| Diffusion | `minimax_h3_fl2va_….safetensors` or `minimax_h3_ref2va_….safetensors` |\n| Text encoder | `qwen3vl_32b_minimax_h3_….safetensors` |\n| VAE | `minimax_h3_video_vae_fp16.safetensors` |\n\n`CLIPLoader` type `minimax`. Latent node `EmptyHunyuanLatentVideo`. Template: 20 steps, CFG 1, 768×448, 49 frames.\n\nThe 32B encoder dominates VRAM. An fp8 or int8 pack is the realistic file on a single consumer GPU. The audio VAE in the pack is not wired by the template.\n\nPipeline class: `MiniMaxH3Pipeline`.\n\n## Hunyuan\n\nNames containing `hunyuan`. Dual encoder when two text files are wired, type `hunyuan_video`, video latent. Pipeline class `HunyuanVideoPipeline`. There is no dedicated template. Build it from the Wan template and swap the files, or add the nodes by hand.\n\n## Quick recognition\n\n| Substring | Family |\n|---|---|\n| `krea2`, `krea-2` | Krea 2 |\n| `zimage`, `z-image`, `z_image` | Z-Image |\n| `minimax`, `hailuo` | MiniMax H3 |\n| `ltxv`, `ltx-2`, `ltx2` | LTX 2.5 |\n| `flux2`, `flux-2`, `klein` | Flux 2 Klein |\n| `qwen` | Qwen Image |\n| `flux` | Flux |\n| `wan`, `umt5` | Wan |\n| `gemma` | LTX 2.5 |\n| `t5` | Flux |\n| `xl` | SDXL |\n"},{id:`docs/graph.md`,label:`Graph`,source:`# Graph

A workflow is nodes and wires. Run does not send the drawing. It sends a compiled prompt: a map of node id to \`class_type\` and \`inputs\`. Links are \`[nodeId, slot]\`, the same shape a Comfy-style client posts to \`/prompt\`.

## Nodes

| Kind | Role | Outputs |
|---|---|---|
| Diffusion | One weight file. Checkpoint or diffusion folder. | model, and for a checkpoint also clip and vae |
| LoRA | Applied to the model line. Optional. | model, clip |
| Text encoder | CLIP, T5, Qwen, UMT5, Gemma | clip |
| VAE | The decode VAE, and for Flux the file the pipeline must load | vae |
| Prompt | Positive or negative text | conditioning |
| Sampler | Steps, CFG, size, seed, batch, frames | image |
| Save | Filename prefix |  |

Add them from the + button, or drag a library row onto the canvas. Dragging picks the node kind from the folder: checkpoints and diffusion models become diffusion nodes, LoRAs become LoRA nodes, VAEs become VAE nodes, text encoders become text encoder nodes.

## How to wire a still

1. Text encoder \`clip\` → prompt \`clip\`.
2. Prompt \`conditioning\` → sampler \`positive\`.
3. A second prompt, if you want a negative, the same way into \`negative\`.
4. Diffusion \`model\` → sampler \`model\`.
5. If you use a LoRA: diffusion → LoRA \`model\`, LoRA \`model\` → sampler \`model\`. The compiler also needs the clip line through the LoRA, and it will attach the clip from the prompt side when it builds the prompt JSON.
6. VAE → sampler \`vae\`.
7. Sampler \`image\` → save.

Flux wants two text encoder nodes, both wired to the positive prompt’s clip port.

The model chain must be diffusion, then zero or more LoRAs, then the sampler. Anything else on that chain is an error.

## Inspector

Select a node.

- Diffusion: file, and a weight dtype of \`default\`, \`fp8_e4m3fn\`, or \`fp8_e5m2\`. Dtype is a hint to the loader. The file’s own packing wins when the pipeline ignores the hint.
- LoRA: file, model strength, CLIP strength. 1 is full strength. 0.6 to 0.8 is a usual range for a style LoRA.
- Prompt: positive or negative, and the text.
- Sampler: steps, CFG / guidance, width, height, batch, frames, denoise, sampler name, scheduler, seed.
- Save: prefix, default \`locgen\`.

Width and height step by 64 and allow 256 to 2560. Frames run from 1 to 241. Batch runs from 1 to 8. Video families should keep batch at 1 and use frames.

Sampler names: euler, euler ancestral, dpmpp 2m, dpmpp sde, uni_pc, heun, ddim, lcm.

Schedulers: simple, normal, karras, beta, exponential, sgm uniform.

The engine passes steps, CFG, seed, width, and height through. Sampler name and scheduler are stored on the job. Diffusers pipelines used for the newer families have their own schedulers, so those two fields do not retune a Krea or Qwen run the way they retune an SDXL checkpoint. Euler and simple are the honest defaults.

Denoise is kept on the graph for img2img-style jobs. The current sampler treats the latent as a full denoise.

## What the compiler emits

For a diffusion-folder file:

\`\`\`
UNETLoader
CLIPLoader or DualCLIPLoader
LoraLoader, once per LoRA
VAELoader
CLIPTextEncode
FluxGuidance          only Flux and SD3, and only when CFG > 1
EmptySD3LatentImage   stills
EmptyHunyuanLatentVideo   Wan, Hunyuan, MiniMax
EmptyLTXVLatentVideo      LTX
KSampler
VAEDecode
SaveImage
\`\`\`

Dual CLIP is only for Flux, SD3, and Hunyuan, and only when two encoders are wired. Every other family uses one \`CLIPLoader\`. A second encoder on a Krea or Qwen graph is ignored, with a warning.

CLIP \`type\` values:

| Family | type |
|---|---|
| Flux | \`flux\` |
| Flux 2 Klein | \`flux2\` |
| SD3 | \`sd3\` |
| SDXL | \`sdxl\` |
| Hunyuan | \`hunyuan_video\` |
| Krea 2 | \`krea2\` |
| Qwen Image, Z-Image | \`qwen_image\` |
| Wan | \`wan\` |
| LTX | \`ltxv\` |
| MiniMax | \`minimax\` |
| SD 1.5 | \`stable_diffusion\` |

For a checkpoint, the loader is \`CheckpointLoaderSimple\`. Its outputs are model, clip, and vae. The latent is \`EmptyLatentImage\` unless the family is one of the diffusion-folder families.

The status line is the compile summary: file, LoRAs, steps, CFG or guidance, size, and frames when the family is video. **Graph ready** means there is no error-level issue. Warnings still compile. API graph shows the JSON that will be posted.

## Rules that block Run

- No sampler, or the sampler’s model port is empty.
- Diffusion node has no file.
- A LoRA node has no file.
- No positive prompt.
- A diffusion-folder model has no text encoder. The message names the encoder that family wants.
- A diffusion-folder model has no VAE.
- No CLIP source at all.

Warnings you can ignore once you understand them:

- More than one sampler. The one wired to a model is compiled.
- A diffusion-family file sitting in \`checkpoints\`. \`UNETLoader\` will not see it.
- No negative prompt. An empty one is encoded.
- Text encoders wired on a checkpoint. The checkpoint CLIP is dropped.
- A file in \`unet\\\` instead of \`diffusion_models\`. It still loads.

## Seeds and repeats

The seed is a number on the sampler. Change it for another image. The studio does not randomize it on each Run. That is deliberate, so a failed run can be repeated after you fix a path.

## Several graphs

Graphs are a list in the browser. The menu switches, duplicates a template, creates an empty graph, or deletes the current one. Deleting does not delete weight files. An empty graph is a blank canvas with a name.

Pan and zoom are per graph. Fit frames the nodes. Drag a port to connect. Delete removes the selected node.
`},{id:`docs/engine.md`,label:`Engine`,source:'# Engine\n\nThe engine is the Python process that samples. The studio never loads a weight. If this process is down, Run has nothing to talk to.\n\n## Start\n\nFrom the studio folder:\n\n```\npythonembedded\\python.exe -s engine\\main.py --models C:\\LocGENStudio\\models --listen 127.0.0.1 --port 8188\n```\n\nArguments:\n\n| Flag | Default | Meaning |\n|---|---|---|\n| `--models` | `C:\\LocGENStudio\\models` | Models root. Created if missing, including the canonical subfolders. |\n| `--output` | the parent of the models root, plus `output` | Where PNGs are written. |\n| `--listen` | `127.0.0.1` | Bind address. Leave it on loopback. |\n| `--port` | `8188` | Must match the engine URL in the studio. |\n\n`pythonembedded\\python.exe -s` keeps the embeddable runtime from picking up a user site-packages by accident. The engine also inserts `pythonembedded\\Lib\\site-packages` when that directory exists.\n\nVersion string reported to the studio is the engine version, currently 1.0.0. The Windows tab shows it next to the GPU name.\n\n## Process model\n\n`/prompt` validates the graph and returns a `prompt_id` immediately. A single worker thread runs the graph. History is written when the job finishes, so the studio keeps polling until then. One job at a time. Further prompts sit on the queue.\n\nValidation failures return HTTP 400 and never enter the queue. Sampling failures become a history item with `status_str` `error` and `exception_message` set. The studio shows that message on the run.\n\n## HTTP\n\nCORS allows any origin, so a page on another host can call loopback. Methods are GET, POST, and OPTIONS.\n\n### `GET /system_stats`\n\n```json\n{\n  "system": { "comfyui_version": "1.0.0" },\n  "devices": [{ "name": "NVIDIA GeForce RTX …" }]\n}\n```\n\nThe field is named `comfyui_version` because that is the field the studio already reads. The value is the LocGENStudio engine version. The device name is the CUDA device, or `pythonembedded`, or `CPU`.\n\n### `POST /prompt`\n\n```json\n{ "prompt": { "1": { "class_type": "UNETLoader", "inputs": {} } }, "client_id": "…" }\n```\n\nSuccess:\n\n```json\n{ "prompt_id": "…", "number": 0 }\n```\n\nFailure:\n\n```json\n{ "error": { "message": "…" }, "node_errors": { "3": { "errors": [{ "message": "…" }] } } }\n```\n\n### `GET /history/{prompt_id}`\n\nMissing jobs return an empty object. A finished job:\n\n```json\n{\n  "prompt_id": {\n    "outputs": {\n      "9": { "images": [{ "filename": "krea2_00001.png", "subfolder": "locgen", "type": "output" }] }\n    },\n    "status": { "status_str": "success", "completed": true, "messages": [] }\n  }\n}\n```\n\n### `GET /queue`\n\n```json\n{\n  "queue_running": [[0, "prompt_id"]],\n  "queue_pending": [[0, "prompt_id"]]\n}\n```\n\nThe studio uses this to say “Sampling on this PC” or how many jobs are waiting.\n\n### `GET /view?filename&subfolder&type`\n\nReturns the PNG. `filename` and `subfolder` are checked so they cannot leave the output directory. Anything else is 404.\n\n## How a graph runs\n\nLinks are resolved depth-first. Each node’s `run` method returns a tuple. Slot 0 is the first output. Cycles are errors. The sinks are the nodes nothing else reads, which should include `SaveImage`.\n\n`KSampler` does not denoise by itself. It stores the request on the latent: model, prompts, steps, CFG, guidance, seed, sampler, scheduler, denoise, frames. `VAEDecode` is what calls the sampler, because that is the node that has both the latent and the VAE path. `SaveImage` writes the PNG.\n\nThat split matters for Flux. The VAE file is not an input of `KSampler` in the compiled graph. It arrives at `VAEDecode`, and the Flux pipeline is built with that file.\n\n## Pipelines\n\n| Kind | How it samples |\n|---|---|\n| `flux` | Flux pipeline. Diffusion file, CLIP-L, T5-XXL, VAE, guidance scale from Flux guidance. |\n| `sdxl`, `sd15` | Checkpoint pipeline from the single file. Optional VAE replacement. |\n| `krea2` | `Krea2Pipeline` |\n| `qwen` | `QwenImage21Pipeline`, then `QwenImagePipeline` |\n| `zimage` | `ZImagePipeline` |\n| `flux2` | `Flux2Pipeline` |\n| `wan` | `WanPipeline` |\n| `ltxv` | `LTX2Pipeline`, then `LTXPipeline` |\n| `minimax` | `MiniMaxH3Pipeline` |\n| `hunyuan` | `HunyuanVideoPipeline` |\n\nIf the class is missing, the job says which name it needed and that the graph itself is valid. If the class exists but `from_single_file` fails, it tries the transformer class, then the VAE and the text encoder.\n\nOn CUDA the pipeline is moved with model CPU offload, and the VAE is tiled when the object supports it. The seed generator is on CPU so the same seed does not depend on a GPU RNG.\n\nLoRAs are applied with `load_lora_weights` and `set_adapters` before the call.\n\n## Libraries\n\n`engine/requirements.txt`:\n\n```\ntorch\ndiffusers\ntransformers\nsafetensors\naccelerate\npillow\n```\n\nThey are imported when a real sample starts, not when the process boots. `Check engine` therefore succeeds even if torch is broken. The first Run is when a bad install shows up.\n\nCLIP-L and T5 configs shipped in `engine/locgen/configs/` are small architecture files so a bare safetensors encoder can be constructed. They are not the weights.\n\n## Checking it without a GPU\n\nFrom the `engine` folder:\n\n```\npython -m locgen.selftest\n```\n\nThe self-test builds a tiny graph, substitutes the sampler, and checks `/system_stats`, `/prompt`, `/history`, and `/view`, including a rejection of a `../` filename. It does not load torch.\n'},{id:`docs/windows.md`,label:`Windows starter`,source:"# Windows starter\n\n`LocGENStudio.exe` is the single file. It unpacks the studio and the engine, starts inference on this PC, and opens the browser. `Start-LocGENStudio.ps1` is the older folder layout, still useful if you want to see the engine directory.\n\n## One exe\n\nPut `LocGENStudio.exe` where you want it. Models stay outside:\n\n- `models` next to the exe, or\n- `C:\\LocGENStudio\\models` if that folder already exists\n\nThe release exe does not contain Python. It finds `pythonembedded` next to the exe or at `C:\\LocGENStudio\\pythonembedded`.\n\n`Build-LocGENStudioExe.ps1` folds that Python folder into a new exe. If the folder is missing, the script downloads embeddable Python 3.12 and installs PyTorch (CUDA 12.8), diffusers, transformers, safetensors, accelerate and pillow. The new exe is several GB. Only the model weights are left for you to download.\n\n## Run the script\n\n```\npowershell -ExecutionPolicy Bypass -File .\\Start-LocGENStudio.ps1 -Root 'C:\\LocGENStudio\\models' -Port 8188\n```\n\n`-Root` is the models folder. `-Port` defaults to 8188.\n\nThe script stops on the first hard error (`$ErrorActionPreference = 'Stop'`).\n\n## What it creates\n\nFor each canonical folder it runs `New-Item -Force`. Existing files are left in place. Alias folders are not created.\n\nCanonical folders:\n\n`checkpoints`, `diffusion_models`, `unet`, `loras`, `vae`, `clip`, `text_encoders`, `clip_vision`, `embeddings`, `controlnet`, `upscale_models`, `hypernetworks`, `style_models`, `ipadapter`, `vae_approx`, `gligen`, `photomaker`, `audio_encoders`, `configs`.\n\n## What it scans\n\nThe canonical folders, plus `text-encoder`, `text_encoder`, `diffussion_models`, and `diffusion-models` when those directories exist.\n\nA file is included when its extension is one of `.safetensors`, `.ckpt`, `.pt`, `.pth`, `.bin`, `.gguf`, `.sft`. The scan is recursive. Each entry records:\n\n- `name`, relative to that folder\n- `folder`, the folder it was found in, alias name included\n- `bytes`\n\nThe manifest is `locgen-manifest.json` in the models root, UTF-8 JSON, with `app` set to `LocGENStudio`.\n\n## What it starts\n\nIt looks for Python in this order:\n\n1. `<studio>\\pythonembedded\\python.exe`\n2. `<studio>\\python_embeded\\python.exe`\n3. `.\\pythonembedded\\python.exe` relative to the current directory\n4. `.\\python_embeded\\python.exe`\n\n`<studio>` is the parent of `-Root`. For `C:\\LocGENStudio\\models` that is `C:\\LocGENStudio`.\n\nThe engine entry is `<studio>\\engine\\main.py`.\n\nIf the engine file is missing, the script prints where it looked and returns. The models folder and the manifest are still written. If Python is missing, it prints the expected `python.exe` path and returns.\n\nWhen both exist it runs:\n\n```\n& $python -s $engine --models $Root --listen 127.0.0.1 --port $Port\n```\n\nThe window stays in the foreground on purpose. That window is the log. Weight loading, CUDA errors, and pipeline tracebacks appear there, and the studio repeats the exception text on the run.\n\n## What it does not do\n\n- It does not download Python or torch.\n- It does not search the disk for a ComfyUI checkout.\n- It does not write `extra_model_paths.yaml`. The engine reads `--models` directly.\n- It does not open firewall ports.\n- It does not copy weights.\n\n## Using an existing models tree\n\nSet the Windows tab root to that tree, download the starter, and run it with that `-Root`. The script adds any missing subfolders beside your files and writes the manifest there. Pointing this at a live models folder is safe for the files already present. It will create empty directories for folders you have never used.\n\nImport that manifest. You do not need to move the weights into `C:\\LocGENStudio\\models` unless you want a single place for them.\n\n## Port already in use\n\nIf something else is on 8188, start with `-Port 8190` and set the studio’s engine URL to `http://127.0.0.1:8190`. Check engine should then answer. A refused connection means the script exited before listen, which the PowerShell window explains.\n"},{id:`docs/troubleshooting.md`,label:`Troubleshooting`,source:`# Troubleshooting

Match the sentence you see, then do the one fix. Do not reinstall the studio for an engine problem.

## Check engine fails immediately

“This browser could not reach the local engine.”

The starter window is not running, or it quit. Read the bottom of that window. The usual lines are:

- \`The inference engine was not found at …\\engine\\main.py\` — unzip the engine next to \`pythonembedded\`, not inside another folder.
- \`pythonembedded\\python.exe was not found\` — the runtime is missing or named something else. \`python_embeded\` is the only other spelling that is accepted.
- A Python traceback on import — a library is missing. Install \`engine\\requirements.txt\` with that same \`python.exe\`.

The URL in the studio must be \`http://127.0.0.1:8188\` unless you changed \`-Port\`. \`https://\` and \`localhost\` with a different port will not work.

A browser extension that proxies all traffic can break loopback. Disable it for this page, or try Edge.

## Check engine works, Run does not

The probe only hits \`/system_stats\`. Sampling is a later import of torch and diffusers. The run’s red text is the real error. The engine window has the full traceback.

## “This graph still points at the sample library”

The diffusion node, a LoRA, or another selected file is still a built-in sample card. Import the manifest or link the folder, then pick the scanned file on each node. Restoring the sample library puts the samples back and will block Run again.

## “Choose weights from the models folder before running.”

A diffusion or loader node has no file selected.

## “is not under diffusion_models/” or a similar folder

The studio has a name the engine cannot see. The manifest is stale, the file was renamed, or it lives in the wrong folder. Put the file in the folder the loader reads, run the starter again, and reimport.

\`text-encoder\` is allowed. A random folder such as \`models\\qwen\` is not.

## “needs a newer diffusers”

The graph is fine. Inside \`pythonembedded\`:

\`\`\`
python.exe -m pip install -U "diffusers>=0.41"
\`\`\`

Restart the starter. Qwen Image 2.1, Krea 2 single-file, and MiniMax H3 single-file are the ones that ask for that line. Flux and SDXL do not.

## “single-file text encoder” / config.json

The diffusion pipeline could not open the weight alone, and the text encoder is a bare safetensors of Qwen or Gemma. Put the encoder in a directory that contains \`config.json\`, the tokenizer files, and the weights. Point the text encoder node at that directory name if the loader is looking for a file, or keep the safetensors next to a tokenizer folder the pipeline can see.

CLIP-L and T5 do not need this. Their configs ship in the engine.

## CUDA out of memory

The engine window says it, and the run repeats it. Lower frames first, then resolution, then switch to the fp8 or int8 file. Close other GPU apps. Offload is already on. A 32B MiniMax encoder plus a video model does not fit every card. See the VRAM table in [NOTES.md](../NOTES.md).

## The run sits on “Loading weights” and then times out

Five minutes is the browser’s patience, not the engine’s. The first load of a 10 GB file plus a text encoder can exceed it on a spinning disk or a cold pagefile. Look at the engine window. If it is still printing or the GPU is busy, let it finish and open \`output\\\`. The PNG is written even if the browser stopped polling.

## Graph ready, but the picture is nonsense or black

- Wrong VAE. Flux on a Qwen VAE, or Krea 2 on \`ae.safetensors\`, decodes garbage.
- Wrong family. A Klein file run through the Flux template uses CLIP-L and T5.
- CFG far from the template. Turbo models at CFG 7 go muddy. SDXL at CFG 1 goes vague.
- A LoRA at strength 1 from another family.

## Two encoders and a warning

Krea, Qwen, Z-Image, Klein, Wan, LTX, and MiniMax use one text encoder. The extra wire is ignored. Flux is the graph that needs two.

## LoRA throws while loading keys

The file is not a diffusers LoRA for that pipeline. The run is telling the truth. Strength and the graph are not the problem. That LoRA needs a pipeline that understands its key names, or it needs to be converted. The studio does not convert LoRA keys.

## Video job returns one picture

That is the current contract. Frames were sampled as far as the pipeline got, and Runs shows the first frame as a PNG. There is no player and no audio. See [NOTES.md](../NOTES.md).

## Manifest imports zero files

The JSON is not a LocGENStudio manifest, or every entry used a folder name that is not in the map. \`app\` should be \`LocGENStudio\`. \`models\` should be a list of \`name\`, \`folder\`, and \`bytes\`.

## Linked folder is empty

The permission was granted, but the directory has no recognized extensions, or the weights are one level higher than the folder you picked. Pick the folder that contains \`diffusion_models\` and \`vae\`, not \`diffusion_models\` itself.

## Images from an old session disappeared

Runs keeps images as blob URLs in the browser session. After a reload, finished runs can lose the preview even though the PNG is still in \`output\\\`. The output folder is the copy that lasts.

## Port in use

Another engine, or an old window you forgot, is on 8188. Close it, or start with \`-Port 8190\` and change the URL in the studio.
`}];function it(e,t){let n=t.includes(`/`)?t.slice(0,t.lastIndexOf(`/`)+1):``,r=e.startsWith(`../`)?e.slice(3):`${n}${e}`;return rt.some(e=>e.id===r)?r:null}function at(){let[e,t]=(0,_.useState)(`README.md`),n=rt.find(t=>t.id===e)??rt[0],r=(0,_.useMemo)(()=>nt(n.source),[n.source]);function i(){let e=n.id.split(`/`).pop()??`LocGENStudio.md`,t=URL.createObjectURL(new Blob([n.source],{type:`text/markdown`})),r=document.createElement(`a`);r.href=t,r.download=e,r.click(),URL.revokeObjectURL(t)}return(0,Z.jsx)(`div`,{className:`h-full overflow-hidden bg-bg`,children:(0,Z.jsxs)(`div`,{className:`mx-auto flex h-full max-w-6xl`,children:[(0,Z.jsxs)(`aside`,{className:`hidden w-52 shrink-0 overflow-auto border-r border-line py-4 md:block`,children:[(0,Z.jsx)(`p`,{className:`px-4 text-xs tracking-widest text-signal uppercase`,children:`Guides`}),(0,Z.jsx)(`ul`,{className:`mt-3`,children:rt.map(e=>(0,Z.jsx)(`li`,{children:(0,Z.jsx)(`button`,{type:`button`,onClick:()=>t(e.id),className:`block w-full px-4 py-2 text-left text-sm ${e.id===n.id?`bg-surface text-fg`:`text-muted`}`,children:e.label})},e.id))})]}),(0,Z.jsxs)(`article`,{className:`min-w-0 flex-1 overflow-auto px-4 py-6 md:px-8`,children:[(0,Z.jsx)(`div`,{className:`mb-4 flex flex-wrap items-center justify-between gap-3 md:hidden`,children:(0,Z.jsxs)(`label`,{className:`min-w-0 flex-1 text-sm text-muted`,children:[`Guide`,(0,Z.jsx)(`select`,{className:`field mt-1`,value:n.id,onChange:e=>t(e.target.value),children:rt.map(e=>(0,Z.jsx)(`option`,{value:e.id,children:e.label},e.id))})]})}),(0,Z.jsx)(`div`,{className:`mb-4 flex justify-end`,children:(0,Z.jsx)(`button`,{type:`button`,onClick:i,className:`h-10 rounded-full border border-line px-4 text-sm text-fg`,children:`Download this page`})}),(0,Z.jsx)(`div`,{className:`docs-body`,onClick:e=>{let r=e.target.closest(`a[data-doc]`);if(!r)return;e.preventDefault();let i=it(r.getAttribute(`data-doc`)??``,n.id);i&&t(i)},dangerouslySetInnerHTML:{__html:r}})]})]})})}function ot(e){if(e instanceof DOMException&&e.name===`AbortError`)return`The local engine did not answer in time.`;let t=e instanceof Error?e.message:`Request failed`;return/failed to fetch|networkerror|load failed|abort/i.test(t)?`This browser could not reach the local engine. On Windows 11, run Start-LocGENStudio.ps1 so it listens on 127.0.0.1:8188 and can read the models folder.`:t}async function st(e){let t=e.replace(/\/$/,``),n=new AbortController,r=setTimeout(()=>n.abort(),4e3);try{let e=await fetch(`${t}/system_stats`,{signal:n.signal});if(!e.ok)return{ok:!1,message:`Engine answered HTTP ${e.status}`};let r=await e.json(),i=r.devices?.[0]?.name,a=r.system?.comfyui_version;return{ok:!0,message:[i,a?`engine ${a}`:`local engine`].filter(Boolean).join(` · `)}}catch(e){return{ok:!1,message:ot(e)}}finally{clearTimeout(r)}}async function ct(e,t){let n=e.replace(/\/$/,``);try{let e=await fetch(`${n}/llm/models?base=${encodeURIComponent(t)}`);if(!e.ok)return[];let r=await e.json();return Array.isArray(r.models)?r.models:[]}catch{return[]}}async function lt(e,t){let n=e.replace(/\/$/,``),r=await fetch(`${n}/prompt`,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify({prompt:t,client_id:crypto.randomUUID()})}),i=await r.json().catch(()=>({}));if(!r.ok||!i.prompt_id){let e=typeof i.error==`string`?i.error:i.error?.message,t=i.node_errors?` ${JSON.stringify(i.node_errors).slice(0,280)}`:``;throw Error((e||`HTTP ${r.status}`)+t)}return i.prompt_id}async function ut(e,t,n){let r=e.replace(/\/$/,``);for(let e=0;e<150;e+=1){await mt(2e3),n(await ft(r,t,e));let i;try{let e=await fetch(`${r}/history/${t}`);if(!e.ok)continue;i=await e.json()}catch{continue}let a=i[t];if(!a)continue;let o=a.outputs??{};for(let e of Object.keys(o)){let t=o[e]?.images?.[0];if(t)return pt(r,t)}if(a.status?.status_str===`error`)throw Error(dt(a.status.messages));if(a.status?.completed)return null}throw Error(`The local engine is still sampling. Check its window, then open the image from the output folder.`)}function dt(e){let t=`The local engine marked the job as an error.`,n=e?.[0];if(!Array.isArray(n))return t;let r=n[1];if(r&&typeof r==`object`&&`exception_message`in r){let e=r.exception_message;if(typeof e==`string`&&e.trim())return e}return t}async function ft(e,t,n){try{let n=await fetch(`${e}/queue`);if(n.ok){let e=await n.json(),r=e.queue_running??[],i=e.queue_pending??[],a=r.some(e=>e[1]===t),o=i.some(e=>e[1]===t);if(a)return`Sampling on this PC`;if(o)return`Waiting in the local queue (${i.length})`}}catch{}return n<2?`Loading weights from the models folder`:`Sampling`}async function pt(e,t){let n=ht(e,t.filename,t.subfolder??``,t.type??`output`);try{let e=await fetch(n);if(!e.ok)return n;let t=await e.blob();return URL.createObjectURL(t)}catch{return n}}function mt(e){return new Promise(t=>setTimeout(t,e))}function ht(e,t,n=``,r=`output`){let i=new URLSearchParams({filename:t,subfolder:n,type:r});return`${e.replace(/\/$/,``)}/view?${i.toString()}`}function gt({dock:e=!1}){let t=Ue(),n=X(e=>e.models),r=X(e=>e.patchNode),i=X(e=>e.connect),a=X(e=>e.disconnectPort),o=X(e=>e.removeSelected),s=t.nodes.find(e=>e.id===t.selectedId)??null;if(!s)return(0,Z.jsxs)(`div`,{className:`flex h-full flex-col justify-end p-4`,children:[(0,Z.jsx)(`p`,{className:`font-display text-2xl text-fg`,children:`Nothing selected`}),(0,Z.jsx)(`p`,{className:`mt-2 text-sm leading-relaxed text-pretty text-muted`,children:`Pick a card to set its weight, prompt or sampler. On a phone, the links are dropdowns here — you do not have to drag ports.`})]});let c=M(s.kind).inputs;return(0,Z.jsxs)(`div`,{className:`flex h-full flex-col ${e?``:`border-l border-line`}`,children:[(0,Z.jsxs)(`div`,{className:`flex items-start justify-between gap-3 border-b border-line px-4 py-3`,children:[(0,Z.jsxs)(`div`,{className:`min-w-0`,children:[(0,Z.jsx)(`p`,{className:`text-xs tracking-widest text-muted uppercase`,children:re(s.kind)}),(0,Z.jsx)(`h2`,{className:`truncate font-display text-2xl text-fg`,children:z(s,n)})]}),(0,Z.jsx)(`button`,{type:`button`,onClick:o,className:`flex size-11 items-center justify-center rounded-full text-muted`,"aria-label":`Delete node`,children:(0,Z.jsx)(m,{className:`size-4`})})]}),(0,Z.jsxs)(`div`,{className:`min-h-0 flex-1 space-y-4 overflow-auto px-4 py-4`,children:[(0,Z.jsx)(_t,{node:s}),s.kind===`image`?(0,Z.jsx)(xt,{node:s}):null,s.kind===`enhance`?(0,Z.jsx)(Tt,{node:s}):null,s.kind===`preview`?(0,Z.jsx)(`p`,{className:`text-sm leading-relaxed text-muted`,children:`Wire an image into this card to see it here and on the canvas. Preview also opens the latest result of this graph.`}):null,s.kind===`diffusion`?(0,Z.jsxs)(`label`,{className:`block text-sm text-muted`,children:[`Weight dtype`,(0,Z.jsxs)(`select`,{className:`field mt-1`,value:s.data.weightDtype??`default`,onChange:e=>r(s.id,{weightDtype:e.target.value}),children:[(0,Z.jsx)(`option`,{value:`default`,children:`default`}),(0,Z.jsx)(`option`,{value:`fp8_e4m3fn`,children:`fp8 e4m3fn`}),(0,Z.jsx)(`option`,{value:`fp8_e5m2`,children:`fp8 e5m2`})]})]}):null,s.kind===`lora`?(0,Z.jsxs)(`div`,{className:`grid grid-cols-2 gap-3`,children:[(0,Z.jsx)(Q,{label:`Model strength`,value:s.data.strengthModel??1,step:.05,min:-2,max:2,onChange:e=>r(s.id,{strengthModel:e})}),(0,Z.jsx)(Q,{label:`CLIP strength`,value:s.data.strengthClip??1,step:.05,min:-2,max:2,onChange:e=>r(s.id,{strengthClip:e})})]}):null,s.kind===`prompt`?(0,Z.jsxs)(`label`,{className:`block text-sm text-muted`,children:[`Text`,(0,Z.jsx)(`textarea`,{className:`field mt-1 min-h-32 resize-y`,value:s.data.text??``,onChange:e=>r(s.id,{text:e.target.value}),placeholder:`Describe the picture. Embedding names go here as tokens.`})]}):null,s.kind===`sampler`?(0,Z.jsx)(vt,{node:s}):null,s.kind===`save`?(0,Z.jsxs)(`label`,{className:`block text-sm text-muted`,children:[`Filename prefix`,(0,Z.jsx)(`input`,{className:`field mt-1`,value:s.data.prefix??``,onChange:e=>r(s.id,{prefix:e.target.value})})]}):null,F(n,s.data.modelId)?.note?(0,Z.jsx)(`p`,{className:`text-sm leading-relaxed text-pretty text-muted`,children:F(n,s.data.modelId)?.note}):null,c.length?(0,Z.jsxs)(`div`,{className:`space-y-3 border-t border-line pt-3`,children:[(0,Z.jsx)(`p`,{className:`text-xs tracking-widest text-muted uppercase`,children:`Connections`}),c.map(e=>{let r=t.edges.filter(t=>t.toNode===s.id&&t.toPort===e.name),o=yt(t.nodes,e.kind,s.id,n);return(0,Z.jsxs)(`div`,{children:[(0,Z.jsx)(`p`,{className:`text-sm text-muted`,children:e.label}),r.map(r=>{let i=t.nodes.find(e=>e.id===r.fromNode);return(0,Z.jsxs)(`div`,{className:`mt-1 flex items-center justify-between gap-2 rounded-lg bg-bg px-3 py-2 text-sm`,children:[(0,Z.jsx)(`span`,{className:`truncate`,children:i?z(i,n):`Missing`}),(0,Z.jsx)(`button`,{type:`button`,className:`text-signal`,onClick:()=>a(s.id,e.name,r.fromNode),children:`Remove`})]},r.id)}),(0,Z.jsxs)(`select`,{className:`field mt-1`,value:``,onChange:t=>{if(!t.target.value)return;let[n,r]=t.target.value.split(`|`);i(n,r,s.id,e.name)},children:[(0,Z.jsx)(`option`,{value:``,children:r.length?`Add another source`:`Choose a source`}),o.map(e=>(0,Z.jsx)(`option`,{value:e.value,children:e.label},e.value))]})]},e.name)})]}):null,bt(s,n)?(0,Z.jsx)(`p`,{className:`text-xs leading-relaxed text-muted`,children:bt(s,n)}):null]})]})}function _t({node:e}){let t=X(e=>e.models),n=X(e=>e.patchNode);if(e.kind===`prompt`||e.kind===`sampler`||e.kind===`save`||e.kind===`image`||e.kind===`preview`||e.kind===`enhance`)return null;let r=be(t,e.kind);return(0,Z.jsxs)(`label`,{className:`block text-sm text-muted`,children:[`File in the model root`,(0,Z.jsxs)(`select`,{className:`field mt-1`,value:e.data.modelId??``,onChange:t=>n(e.id,{modelId:t.target.value||void 0}),children:[(0,Z.jsx)(`option`,{value:``,children:`Choose a file`}),r.map(e=>(0,Z.jsxs)(`option`,{value:e.id,children:[e.name,` · `,te(e.folder)?.label]},e.id))]})]})}function vt({node:e}){let t=X(e=>e.patchNode),n=e.data,r=n.editMode??`generate`;return(0,Z.jsxs)(`div`,{className:`space-y-3`,children:[(0,Z.jsxs)(`label`,{className:`block text-sm text-muted`,children:[`Mode`,(0,Z.jsx)(`select`,{className:`field mt-1`,value:r,onChange:r=>t(e.id,{editMode:r.target.value,denoise:r.target.value===`generate`?1:n.denoise&&n.denoise<1?n.denoise:.55}),children:I.map(e=>(0,Z.jsx)(`option`,{value:e.id,children:e.label},e.id))})]}),(0,Z.jsx)(`p`,{className:`text-sm leading-relaxed text-muted`,children:r===`generate`?`A new picture from the prompt.`:r===`edit`?`Img2img. Connect an image. Denoise is how far the model is allowed to move from it.`:r===`inpaint`?`Paint a mask on the image. The model changes only that area.`:`Grows the canvas by the padding below, then fills the new area.`}),(0,Z.jsxs)(`div`,{className:`grid grid-cols-2 gap-3`,children:[(0,Z.jsx)(Q,{label:`Steps`,value:n.steps??20,step:1,min:1,max:150,onChange:n=>t(e.id,{steps:n})}),(0,Z.jsx)(Q,{label:`CFG / guidance`,value:n.cfg??1,step:.1,min:0,max:30,onChange:n=>t(e.id,{cfg:n})}),r===`generate`?(0,Z.jsxs)(Z.Fragment,{children:[(0,Z.jsx)(Q,{label:`Width`,value:n.width??1024,step:64,min:256,max:2560,onChange:n=>t(e.id,{width:n})}),(0,Z.jsx)(Q,{label:`Height`,value:n.height??1024,step:64,min:256,max:2560,onChange:n=>t(e.id,{height:n})}),(0,Z.jsx)(Q,{label:`Frames`,value:n.frames??1,step:1,min:1,max:241,onChange:n=>t(e.id,{frames:n})})]}):null,(0,Z.jsx)(Q,{label:`Batch`,value:n.batch??1,step:1,min:1,max:8,onChange:n=>t(e.id,{batch:n})}),(0,Z.jsx)(Q,{label:`Denoise`,value:n.denoise??1,step:.05,min:0,max:1,onChange:n=>t(e.id,{denoise:n})})]}),r===`outpaint`?(0,Z.jsxs)(`div`,{className:`grid grid-cols-2 gap-3`,children:[(0,Z.jsx)(Q,{label:`Pad left`,value:n.padLeft??128,step:8,min:0,max:1024,onChange:n=>t(e.id,{padLeft:n})}),(0,Z.jsx)(Q,{label:`Pad right`,value:n.padRight??128,step:8,min:0,max:1024,onChange:n=>t(e.id,{padRight:n})}),(0,Z.jsx)(Q,{label:`Pad top`,value:n.padTop??128,step:8,min:0,max:1024,onChange:n=>t(e.id,{padTop:n})}),(0,Z.jsx)(Q,{label:`Pad bottom`,value:n.padBottom??128,step:8,min:0,max:1024,onChange:n=>t(e.id,{padBottom:n})})]}):null,(0,Z.jsxs)(`label`,{className:`block text-sm text-muted`,children:[`Sampler`,(0,Z.jsx)(`select`,{className:`field mt-1`,value:n.sampler??`euler`,onChange:n=>t(e.id,{sampler:n.target.value}),children:_e.map(e=>(0,Z.jsx)(`option`,{children:e},e))})]}),(0,Z.jsxs)(`label`,{className:`block text-sm text-muted`,children:[`Scheduler`,(0,Z.jsx)(`select`,{className:`field mt-1`,value:n.scheduler??`simple`,onChange:n=>t(e.id,{scheduler:n.target.value}),children:ve.map(e=>(0,Z.jsx)(`option`,{children:e},e))})]}),(0,Z.jsxs)(`label`,{className:`block text-sm text-muted`,children:[`Seed`,(0,Z.jsxs)(`span`,{className:`mt-1 flex gap-2`,children:[(0,Z.jsx)(`input`,{className:`field tabular-nums`,type:`number`,value:n.seed??0,onChange:n=>t(e.id,{seed:Number(n.target.value)})}),(0,Z.jsx)(`button`,{type:`button`,className:`flex size-11 shrink-0 items-center justify-center rounded-xl border border-line`,"aria-label":`Random seed`,onClick:()=>t(e.id,{seed:Math.floor(Math.random()*1e9)}),children:(0,Z.jsx)(o,{className:`size-4`})})]})]})]})}function Q({label:e,value:t,onChange:n,min:r,max:i,step:a}){return(0,Z.jsxs)(`label`,{className:`block text-sm text-muted`,children:[e,(0,Z.jsx)(`input`,{className:`field mt-1 tabular-nums`,type:`number`,min:r,max:i,step:a,value:t,onChange:e=>n(Number(e.target.value))})]})}function yt(e,t,n,r){let i=[];for(let a of e)if(a.id!==n)for(let e of M(a.kind).outputs)e.kind===t&&i.push({value:`${a.id}|${e.name}`,label:`${z(a,r)} · ${e.label}`});return i}function bt(e,t){let n=F(t,e.data.modelId);if(!n)return``;let r=te(n.folder);return e.kind===`diffusion`&&(n.family===`flux`||n.folder===`diffusion_models`)?`UNETLoader reads diffusion_models and unet. Pair it with CLIP-L, T5 and ae.safetensors.`:e.kind===`textEncoder`?`${r?.label} is searched by CLIPLoader and DualCLIPLoader.`:e.kind===`lora`?`Placed in loras/. Strength is applied in chain order, closest to the sampler last.`:``}function xt({node:e}){let t=X(e=>e.patchNode);return(0,Z.jsxs)(`div`,{className:`space-y-3`,children:[(0,Z.jsxs)(`label`,{className:`block text-sm text-muted`,children:[`Picture`,(0,Z.jsx)(`input`,{type:`file`,accept:`image/*`,className:`field mt-1`,onChange:n=>{let r=n.target.files?.[0];r&&Ae(r).then(n=>t(e.id,{imageName:n.name,imageData:n.data,imageWidth:n.width,imageHeight:n.height,maskData:void 0}))}})]}),e.data.imageData?(0,Z.jsx)(St,{image:e.data.imageData,mask:e.data.maskData,width:e.data.imageWidth??512,height:e.data.imageHeight??512,onChange:n=>t(e.id,{maskData:n})}):(0,Z.jsx)(`p`,{className:`text-sm text-muted`,children:`Drop a picture on the canvas, or choose one here. Then set the sampler to Edit, Inpaint, or Outpaint.`})]})}function St({image:e,mask:t,width:n,height:r,onChange:i}){let a=(0,_.useRef)(null),o=(0,_.useRef)(null),s=(0,_.useRef)(!1);(0,_.useEffect)(()=>{let i=document.createElement(`canvas`);i.width=n,i.height=r;let s=i.getContext(`2d`);if(!s)return;s.fillStyle=`#000`,s.fillRect(0,0,n,r),o.current=i;let c=()=>Ct(a.current,i,e,n,r);if(!t){c();return}let l=new Image;l.onload=()=>{s.drawImage(l,0,0,n,r),c()},l.src=t},[e,t,n,r]);function c(t,c=!1){let l=o.current,u=a.current;if(!l||!u)return;let d=l.getContext(`2d`);if(!d)return;let f=u.getBoundingClientRect(),p=(t.clientX-f.left)/f.width*n,m=(t.clientY-f.top)/f.height*r;(s.current||t.type===`pointerdown`)&&(d.fillStyle=`#fff`,d.beginPath(),d.arc(p,m,Math.max(12,n/28),0,Math.PI*2),d.fill(),Ct(u,l,e,n,r)),c&&(s.current=!1,i(l.toDataURL(`image/png`)))}return(0,Z.jsxs)(`div`,{className:`space-y-2`,children:[(0,Z.jsx)(`p`,{className:`text-sm text-muted`,children:`Paint the area to change. Used by Inpaint. Outpaint grows the frame instead.`}),(0,Z.jsx)(`canvas`,{ref:a,width:n,height:r,className:`w-full cursor-crosshair rounded-xl bg-bg`,onPointerDown:e=>{s.current=!0,e.currentTarget.setPointerCapture(e.pointerId),c(e)},onPointerMove:e=>{s.current&&c(e)},onPointerUp:e=>c(e,!0)}),(0,Z.jsx)(`button`,{type:`button`,className:`h-10 rounded-full border border-line px-3 text-sm`,onClick:()=>{let t=o.current,s=t?.getContext(`2d`);t&&s&&(s.fillStyle=`#000`,s.fillRect(0,0,n,r),Ct(a.current,t,e,n,r),i(``))},children:`Clear mask`})]})}function Ct(e,t,n,r,i){if(!e)return;let a=e.getContext(`2d`),o=t.getContext(`2d`);if(!a||!o)return;let s=e=>{a.drawImage(e,0,0,r,i);let t=o.getImageData(0,0,r,i),n=a.getImageData(0,0,r,i);for(let e=0;e<t.data.length;e+=4){let r=t.data[e]/255*.55;r<.02||(n.data[e]=Math.round(n.data[e]*(1-r)+158*r),n.data[e+1]=Math.round(n.data[e+1]*(1-r)+203*r),n.data[e+2]=Math.round(n.data[e+2]*(1-r)+182*r))}a.putImageData(n,0,0)},c=wt.get(n);if(c?.complete){s(c);return}let l=new Image;l.onload=()=>{wt.set(n,l),s(l)},l.src=n}var wt=new Map;function Tt({node:e}){let t=X(e=>e.patchNode),n=X(e=>e.engineUrl),[r,i]=(0,_.useState)([]),[a,o]=(0,_.useState)(``),s=e.data;return(0,Z.jsxs)(`div`,{className:`space-y-3`,children:[(0,Z.jsxs)(`label`,{className:`block text-sm text-muted`,children:[`System prompt`,(0,Z.jsx)(`textarea`,{className:`field mt-1 min-h-24 resize-y`,value:s.system??`You rewrite image prompts. Keep the subject and the intent. Add light, lens, texture, and composition. Return only the prompt, with no explanation.`,onChange:n=>t(e.id,{system:n.target.value})})]}),(0,Z.jsxs)(`label`,{className:`block text-sm text-muted`,children:[`Prompt to rewrite`,(0,Z.jsx)(`textarea`,{className:`field mt-1 min-h-24 resize-y`,value:s.text??``,placeholder:`What should change, or the prompt to expand`,onChange:n=>t(e.id,{text:n.target.value})})]}),(0,Z.jsxs)(`label`,{className:`block text-sm text-muted`,children:[`LLM server`,(0,Z.jsx)(`select`,{className:`field mt-1`,value:s.endpoint??L[0].url,onChange:n=>t(e.id,{endpoint:n.target.value}),children:L.map(e=>(0,Z.jsxs)(`option`,{value:e.url,children:[e.label,` · `,e.url]},e.url))})]}),(0,Z.jsxs)(`label`,{className:`block text-sm text-muted`,children:[`LLM model`,(0,Z.jsx)(`input`,{className:`field mt-1`,value:s.llm??``,placeholder:`llama3.1`,onChange:n=>t(e.id,{llm:n.target.value}),list:`llm-${e.id}`}),(0,Z.jsx)(`datalist`,{id:`llm-${e.id}`,children:r.map(e=>(0,Z.jsx)(`option`,{value:e},e))})]}),(0,Z.jsx)(`button`,{type:`button`,className:`h-10 rounded-full border border-line px-3 text-sm`,onClick:()=>{o(`Asking the engine…`),ct(n,s.endpoint??L[0].url).then(n=>{i(n),o(n.length?`${n.length} models`:`No models. Is that server running?`),n[0]&&!s.llm&&t(e.id,{llm:n[0]})})},children:`List models`}),a?(0,Z.jsx)(`p`,{className:`text-sm text-muted`,children:a}):null,(0,Z.jsx)(Q,{label:`Temperature`,value:s.temperature??.4,step:.1,min:0,max:2,onChange:n=>t(e.id,{temperature:n})}),(0,Z.jsx)(`p`,{className:`text-sm leading-relaxed text-muted`,children:`Wire the text output into a prompt. An optional image input is sent when the LLM can see pictures. The engine calls the server when you press Run.`})]})}function Et(){let e=X(e=>e.jobs),[t,n]=(0,_.useState)(e[0]?.id??null);return(0,Z.jsx)(`div`,{className:`h-full overflow-auto bg-bg`,children:(0,Z.jsxs)(`div`,{className:`mx-auto max-w-3xl px-4 py-6`,children:[(0,Z.jsx)(`p`,{className:`text-xs tracking-widest text-muted uppercase`,children:`Queue`}),(0,Z.jsx)(`h2`,{className:`mt-1 font-display text-4xl text-fg`,children:`Local runs`}),(0,Z.jsx)(`p`,{className:`mt-2 max-w-xl text-sm leading-relaxed text-pretty text-muted`,children:`Run samples the linked weights on this PC. Diffusion models, LoRAs, text encoders and VAEs are read from the models root. If the local engine is not running yet, the graph is kept here until it is.`}),e.length===0?(0,Z.jsxs)(`div`,{className:`mt-8 rounded-2xl border border-line bg-surface px-4 py-8`,children:[(0,Z.jsx)(`p`,{className:`font-display text-2xl text-fg`,children:`No jobs yet`}),(0,Z.jsx)(`p`,{className:`mt-2 text-sm text-muted`,children:`Link the models folder, then press Run. The finished image shows up on this card.`})]}):(0,Z.jsx)(`ul`,{className:`mt-6 space-y-3`,children:e.map(e=>(0,Z.jsxs)(`li`,{className:`rounded-2xl border border-line bg-surface`,children:[(0,Z.jsxs)(`button`,{type:`button`,className:`w-full px-4 py-3 text-left`,onClick:()=>n(t===e.id?null:e.id),children:[(0,Z.jsxs)(`div`,{className:`flex items-baseline justify-between gap-3`,children:[(0,Z.jsx)(`p`,{className:`text-sm text-fg`,children:e.workflowName}),(0,Z.jsx)(`p`,{className:`text-xs tracking-widest text-signal uppercase`,children:e.status})]}),(0,Z.jsx)(`p`,{className:`mt-1 text-sm text-muted`,children:e.summary}),(0,Z.jsx)(`p`,{className:`mt-2 text-xs text-muted`,children:e.message})]}),t===e.id?(0,Z.jsx)(Dt,{job:e}):null]},e.id))})]})})}function Dt({job:e}){let[t,n]=(0,_.useState)(!1);return(0,Z.jsxs)(`div`,{className:`border-t border-line px-4 py-3`,children:[e.imageUrl?(0,Z.jsx)(`button`,{type:`button`,className:`mb-3 block w-full`,onClick:()=>n(!0),"aria-label":`Preview image`,children:(0,Z.jsx)(`img`,{src:e.imageUrl,alt:``,className:`max-h-96 w-full rounded-xl bg-bg object-contain`})}):null,t&&e.imageUrl?(0,Z.jsx)(`div`,{className:`fixed inset-0 z-40 flex items-center justify-center bg-black/75 p-6`,onClick:()=>n(!1),children:(0,Z.jsx)(`img`,{src:e.imageUrl,alt:`Preview`,className:`max-h-[85vh] max-w-full rounded-2xl object-contain`})}):null,(0,Z.jsx)(`p`,{className:`text-xs text-muted`,children:e.chain.join(` → `)}),(0,Z.jsxs)(`div`,{className:`mt-3 flex gap-2`,children:[(0,Z.jsx)(`button`,{type:`button`,className:`h-10 rounded-full bg-fg px-4 text-sm font-medium text-bg`,onClick:()=>navigator.clipboard?.writeText(e.promptJson),children:`Copy JSON`}),(0,Z.jsx)(`button`,{type:`button`,className:`h-10 rounded-full border border-line px-4 text-sm text-fg`,onClick:()=>Ot(`${e.workflowName.replace(/\s+/g,`-`).toLowerCase()}.json`,e.promptJson),children:`Download`})]}),(0,Z.jsx)(`pre`,{className:`mt-3 max-h-72 overflow-auto rounded-xl bg-bg p-3 text-xs leading-relaxed text-fg`,children:e.promptJson})]})}function Ot(e,t){let n=URL.createObjectURL(new Blob([t],{type:`application/json`})),r=document.createElement(`a`);r.href=n,r.download=e,r.click(),URL.revokeObjectURL(n)}function kt(){let e=X(e=>e.models),[t,n]=(0,_.useState)(``),[r,i]=(0,_.useState)(`all`),[a,o]=(0,_.useState)(!1),s=(0,_.useMemo)(()=>{let n=t.trim().toLowerCase();return e.filter(e=>r!==`all`&&e.folder!==r?!1:!n||e.name.toLowerCase().includes(n)||e.family.includes(n))},[e,t,r]),c=y.map(e=>({spec:e,files:s.filter(t=>t.folder===e.id)})).filter(e=>e.files.length>0);return(0,Z.jsxs)(`div`,{className:`flex h-full min-h-0 flex-col bg-bg`,children:[(0,Z.jsxs)(`div`,{className:`border-b border-line px-4 py-3`,children:[(0,Z.jsxs)(`div`,{className:`flex items-baseline justify-between gap-3`,children:[(0,Z.jsx)(`h2`,{className:`font-display text-2xl text-fg`,children:`Model root`}),(0,Z.jsxs)(`p`,{className:`text-sm text-muted tabular-nums`,children:[e.length,` files`]})]}),(0,Z.jsxs)(`label`,{className:`mt-3 flex items-center gap-2 rounded-xl border border-line bg-surface px-3`,children:[(0,Z.jsx)(p,{className:`size-4 text-muted`}),(0,Z.jsx)(`input`,{value:t,onChange:e=>n(e.target.value),placeholder:`Search weights`,className:`h-11 w-full bg-transparent text-base text-fg outline-none`})]}),(0,Z.jsxs)(`div`,{className:`mt-3 flex gap-2 overflow-auto pb-1`,children:[(0,Z.jsx)(Nt,{active:r===`all`,onClick:()=>i(`all`),children:`All`}),y.map(e=>(0,Z.jsx)(Nt,{active:r===e.id,onClick:()=>i(e.id),children:e.label},e.id))]})]}),(0,Z.jsx)(`div`,{className:`min-h-0 flex-1 overflow-auto px-3 py-3`,children:c.length===0?(0,Z.jsx)(`p`,{className:`px-2 py-8 text-sm text-muted`,children:`Nothing in this filter. Link the Windows folder or add a file below.`}):c.map(e=>(0,Z.jsxs)(`section`,{className:`mb-4`,children:[(0,Z.jsxs)(`header`,{className:`flex items-baseline justify-between px-2 py-1`,children:[(0,Z.jsx)(`h3`,{className:`text-sm text-fg`,children:e.spec.label}),(0,Z.jsx)(`p`,{className:`text-xs text-muted`,children:e.spec.loader})]}),(0,Z.jsx)(`ul`,{className:`overflow-hidden rounded-2xl border border-line`,children:e.files.map(e=>(0,Z.jsx)(`li`,{className:`border-b border-line last:border-b-0`,children:(0,Z.jsx)(At,{model:e})},e.id))})]},e.spec.id))}),(0,Z.jsxs)(`div`,{className:`border-t border-line px-4 py-3`,children:[(0,Z.jsx)(`button`,{type:`button`,className:`text-sm text-signal`,onClick:()=>o(e=>!e),children:a?`Close`:`Add a weight by hand`}),a?(0,Z.jsx)(Mt,{}):null]})]})}function At({model:e}){let t=A(e.folder),n=X(e=>e.removeModel);return(0,Z.jsxs)(`div`,{className:`flex items-center gap-3 bg-surface px-3 py-3`,draggable:!!t,onDragStart:t=>{t.dataTransfer.setData(`text/plain`,`model:${e.id}`),t.dataTransfer.effectAllowed=`copy`},children:[(0,Z.jsxs)(`div`,{className:`min-w-0 flex-1`,children:[(0,Z.jsx)(`p`,{className:`truncate text-sm text-fg`,children:e.name}),(0,Z.jsxs)(`p`,{className:`mt-0.5 text-xs text-muted`,children:[ne(e.family),` · `,O(e.bytes),e.source===`demo`?` · sample`:``]})]}),t?(0,Z.jsx)(`button`,{type:`button`,onClick:()=>jt(e),className:`h-10 shrink-0 rounded-full bg-accent px-3 text-sm font-medium text-accent-ink`,children:`Place`}):(0,Z.jsx)(`button`,{type:`button`,className:`h-10 shrink-0 rounded-full border border-line px-3 text-sm text-fg`,onClick:()=>navigator.clipboard?.writeText(e.name.split(`/`).pop()??e.name),children:`Copy`}),(0,Z.jsx)(`button`,{type:`button`,onClick:()=>n(e.id),className:`text-xs text-muted`,"aria-label":`Remove ${e.name}`,children:`Hide`})]})}function jt(e){let t=X.getState(),n=t.workflows.find(e=>e.id===t.activeId);if(!n)return;let r=t.viewportPx.w>40?t.viewportPx:{w:800,h:640},i=We(n.pan,n.zoom,r);t.addModelNode(e,i.x,i.y),t.setView(`canvas`)}function Mt(){let e=X(e=>e.addModel),[t,n]=(0,_.useState)(``),[r,i]=(0,_.useState)(`loras`),[a,o]=(0,_.useState)(`0.2`),[s,c]=(0,_.useState)(`auto`);return(0,Z.jsxs)(`form`,{className:`mt-3 space-y-2`,onSubmit:i=>{i.preventDefault();let o=t.trim().replace(/\\/g,`/`);if(!o)return;let c=/\.[a-z0-9]+$/i.test(o)?o:`${o}.safetensors`;e({id:T(`man`),name:c,folder:r,bytes:Math.round(Number(a||0)*1e9),family:s===`auto`?k(c,r):s,source:`manual`}),n(``)},children:[(0,Z.jsx)(`input`,{className:`field`,placeholder:`filename.safetensors`,value:t,onChange:e=>n(e.target.value)}),(0,Z.jsxs)(`div`,{className:`grid grid-cols-2 gap-2`,children:[(0,Z.jsx)(`select`,{className:`field`,value:r,onChange:e=>i(e.target.value),children:y.map(e=>(0,Z.jsx)(`option`,{value:e.id,children:e.label},e.id))}),(0,Z.jsxs)(`select`,{className:`field`,value:s,onChange:e=>c(e.target.value),children:[(0,Z.jsx)(`option`,{value:`auto`,children:`Guess family`}),v.map(e=>(0,Z.jsx)(`option`,{value:e,children:ne(e)},e))]})]}),(0,Z.jsxs)(`label`,{className:`block text-xs text-muted`,children:[`Size in GB`,(0,Z.jsx)(`input`,{className:`field mt-1`,inputMode:`decimal`,value:a,onChange:e=>o(e.target.value)})]}),(0,Z.jsx)(`button`,{type:`submit`,className:`h-11 w-full rounded-full bg-fg text-sm font-medium text-bg`,children:`Add to library`})]})}function Nt({active:e,onClick:t,children:n}){return(0,Z.jsx)(`button`,{type:`button`,onClick:t,className:`h-9 shrink-0 rounded-full px-3 text-sm ${e?`bg-accent text-accent-ink`:`bg-surface text-muted`}`,children:n})}function Pt(e){let t=e.toLowerCase();return x.some(e=>t.endsWith(e))}async function Ft(e,t,n,r,i){if(!(!e.values||i.n<=0))for await(let a of e.values()){if(i.n<=0)return;if(a.kind===`file`){if(!Pt(a.name)||!a.getFile)continue;let e=await a.getFile(),o=n?`${n}/${a.name}`:a.name;r.push({id:T(`file`),name:o,folder:t,bytes:e.size,family:k(o,t),source:`scan`}),--i.n}else a.kind===`directory`&&n.split(`/`).length<3&&await Ft(a,t,n?`${n}/${a.name}`:a.name,r,i)}}async function It(e){let t=[],n={n:2e3},r=E(e.name);if(r&&e.values)return await Ft(e,r,``,t,n),t;if(!e.values)return t;for await(let r of e.values()){if(r.kind!==`directory`)continue;let e=E(r.name);e&&await Ft(r,e,``,t,n)}return t}function Lt(){return typeof window<`u`&&`showDirectoryPicker`in window}async function Rt(){let e=window.showDirectoryPicker;if(!e)return null;let t=await e({mode:`read`}),n=await It(t);return{name:t.name,models:n}}function zt(e){if(!e||typeof e!=`object`)return null;let t=e;if(!Array.isArray(t.models))return null;let n=[];for(let e of t.models){if(!e||typeof e.name!=`string`||typeof e.folder!=`string`)continue;let t=E(e.folder);if(!t)continue;let r=e.name.replace(/\\/g,`/`).replace(/^\//,``);n.push({id:T(`man`),name:r,folder:t,bytes:typeof e.bytes==`number`?e.bytes:0,family:e.family??k(r,t),source:`scan`,note:e.note})}return{root:typeof t.root==`string`?t.root:void 0,models:n}}var Bt=[`checkpoints`,`diffusion_models`,`unet`,`loras`,`vae`,`clip`,`text_encoders`,`clip_vision`,`embeddings`,`controlnet`,`upscale_models`,`hypernetworks`,`style_models`,`ipadapter`,`vae_approx`,`gligen`,`photomaker`,`audio_encoders`,`configs`];function Vt(e){let t=e.replace(/'/g,`''`);return`# LocGENStudio — models root and local inference engine
# Windows 11. Right-click, Run with PowerShell, or:
#   powershell -ExecutionPolicy Bypass -File .\\Start-LocGENStudio.ps1 -Root '${t}'
param(
  [string]$Root = '${t}',
  [int]$Port = 8188
)

$ErrorActionPreference = 'Stop'
$folders = @(
${Bt.map(e=>`  '${e}'`).join(`,
`)}
)

foreach ($name in $folders) {
  New-Item -ItemType Directory -Force -Path (Join-Path $Root $name) | Out-Null
}

$ext = @('.safetensors','.ckpt','.pt','.pth','.bin','.gguf','.sft')
$scanFolders = $folders + @('text-encoder','text_encoder','diffussion_models','diffusion-models')
$models = New-Object System.Collections.Generic.List[object]
foreach ($name in $scanFolders) {
  $dir = Join-Path $Root $name
  if (-not (Test-Path $dir)) { continue }
  Get-ChildItem -Path $dir -File -Recurse -ErrorAction SilentlyContinue | Where-Object {
    $ext -contains $_.Extension.ToLower()
  } | ForEach-Object {
    $rel = $_.FullName.Substring($dir.Length).TrimStart('\\','/')
    $rel = ($rel -replace '\\\\','/')
    $entryName = if ([string]::IsNullOrWhiteSpace($rel)) { $_.Name } else { $rel }
    $models.Add([ordered]@{
      name = $entryName
      folder = $name
      bytes = [int64]$_.Length
    })
  }
}

$manifest = [ordered]@{
  app = 'LocGENStudio'
  root = $Root
  generatedAt = (Get-Date).ToString('o')
  models = $models
}
$out = Join-Path $Root 'locgen-manifest.json'
$manifest | ConvertTo-Json -Depth 6 | Set-Content -Path $out -Encoding utf8

$studio = Split-Path $Root -Parent
$engine = Join-Path $studio 'engine\\main.py'
$pythonCandidates = @(
  (Join-Path $studio 'pythonembedded\\python.exe'),
  (Join-Path $studio 'python_embeded\\python.exe'),
  (Join-Path (Get-Location) 'pythonembedded\\python.exe'),
  (Join-Path (Get-Location) 'python_embeded\\python.exe')
)
$python = $pythonCandidates | Where-Object { Test-Path $_ } | Select-Object -First 1

Write-Host ""
Write-Host "Model root: $Root"
Write-Host "Manifest:   $out"
Write-Host "Weights:    $($models.Count)"

if (-not (Test-Path $engine)) {
  Write-Host ""
  Write-Host "Models folder is ready. Import locgen-manifest.json in LocGENStudio."
  Write-Host "The inference engine was not found at $engine"
  Write-Host "Place engine\\ next to pythonembedded\\, then run this script again."
  return
}

if (-not $python) {
  Write-Host ""
  Write-Host "Models folder is ready, but pythonembedded\\python.exe was not found beside the studio."
  Write-Host "Expected: $studio\\pythonembedded\\python.exe"
  return
}

Write-Host "Python:     $python"
Write-Host "Engine:     $engine"
Write-Host "Listening:  http://127.0.0.1:$Port"
Write-Host "Weights stay in the models root. The engine samples them on this PC."
& $python -s $engine --models $Root --listen 127.0.0.1 --port $Port
`}var Ht=`LocGENStudio infers on this PC. Weights stay in the models root.

Default layout:

  C:\\LocGENStudio\\
    pythonembedded\\python.exe
    engine\\main.py
    models\\
      diffusion_models\\   Flux, Krea 2, Qwen Image 2.1, Z-Image, Wan 2.2, LTX 2.5, MiniMax H3
      loras\\
      text_encoders\\      also accepts text-encoder\\
      vae\\
      clip\\
      checkpoints\\        SD1.5 and SDXL
    output\\

Unzip the engine next to pythonembedded, then run Start-LocGENStudio.ps1. It creates the models tree, writes locgen-manifest.json, and starts inference on http://127.0.0.1:8188.

Import the manifest here, or link the folder in Edge or Chrome. Then press Run. The canvas is compiled and sampled on the GPU. The image comes back to Runs.`;function Ut(){let e=X(e=>e.rootPath),t=X(e=>e.engineUrl),n=X(e=>e.models),r=X(e=>e.linkLabel),i=X(e=>e.setRootPath),a=X(e=>e.setEngineUrl),o=X(e=>e.replaceModels),s=X(e=>e.restoreDemo),c=X(e=>e.setRootPath),l=(0,_.useRef)(null),[u,d]=(0,_.useState)(`Not checked`),[f,p]=(0,_.useState)(!1),[m,h]=(0,_.useState)(``),g=n.reduce((e,t)=>e+(t.bytes||0),0);async function v(){p(!0),h(``);try{let e=await Rt();if(!e){h(`This browser cannot open a folder. Import the manifest from the Windows script instead.`);return}o(e.models,e.name),h(e.models.length?`Linked “${e.name}” · ${e.models.length} weights.`:`“${e.name}” has no recognized weight files yet.`)}catch(e){if(e instanceof DOMException&&e.name===`AbortError`)return;h(e instanceof Error?e.message:`Could not read that folder.`)}finally{p(!1)}}async function b(e){let t=await e.text(),n=zt(JSON.parse(t));n?(o(n.models,e.name),n.root&&c(n.root),h(`Imported ${n.models.length} files${n.root?` from ${n.root}`:``}.`)):h(`That file is not a LocGENStudio manifest.`)}return(0,Z.jsx)(`div`,{className:`h-full overflow-auto bg-bg`,children:(0,Z.jsxs)(`div`,{className:`mx-auto grid max-w-5xl gap-6 px-4 py-6 lg:grid-cols-[1.2fr_0.8fr]`,children:[(0,Z.jsxs)(`section`,{children:[(0,Z.jsx)(`p`,{className:`text-xs tracking-widest text-signal uppercase`,children:`Windows 11`}),(0,Z.jsx)(`h2`,{className:`mt-1 font-display text-4xl text-balance text-fg`,children:`One models folder. Inference stays on this PC.`}),(0,Z.jsx)(`p`,{className:`mt-3 max-w-xl text-sm leading-relaxed text-pretty text-muted`,children:`Put diffusion weights, LoRAs, text encoders, VAEs and CLIP files under a single root, in the same layout a local engine expects. Run compiles the canvas and samples those files. Nothing is uploaded.`}),(0,Z.jsxs)(`label`,{className:`mt-6 block text-sm text-muted`,children:[`Model root`,(0,Z.jsx)(`input`,{className:`field mt-1 font-mono text-sm`,value:e,onChange:e=>i(e.target.value),spellCheck:!1})]}),(0,Z.jsx)(`div`,{className:`mt-2 flex flex-wrap gap-2`,children:S.map(e=>(0,Z.jsx)(`button`,{type:`button`,onClick:()=>i(e.path),className:`h-9 rounded-full bg-surface px-3 text-sm text-fg`,children:e.label},e.path))}),(0,Z.jsxs)(`label`,{className:`mt-5 block text-sm text-muted`,children:[`Local engine URL`,(0,Z.jsx)(`input`,{className:`field mt-1`,value:t,onChange:e=>a(e.target.value),spellCheck:!1})]}),(0,Z.jsxs)(`div`,{className:`mt-3 flex flex-wrap gap-2`,children:[(0,Z.jsx)(`button`,{type:`button`,disabled:f,onClick:v,className:`h-11 rounded-full bg-accent px-4 text-sm font-medium text-accent-ink disabled:opacity-50`,children:Lt()?`Link folder on this PC`:`Folder link unavailable`}),(0,Z.jsx)(`button`,{type:`button`,onClick:()=>l.current?.click(),className:`h-11 rounded-full border border-line px-4 text-sm text-fg`,children:`Import manifest`}),(0,Z.jsx)(`button`,{type:`button`,onClick:s,className:`h-11 rounded-full border border-line px-4 text-sm text-muted`,children:`Restore sample library`}),(0,Z.jsx)(`input`,{ref:l,type:`file`,accept:`application/json,.json`,className:`hidden`,onChange:e=>{let t=e.target.files?.[0];t&&b(t).catch(()=>h(`Could not read that JSON.`)),e.target.value=``}})]}),(0,Z.jsxs)(`p`,{className:`mt-3 text-sm text-muted`,children:[r?`Last link: ${r}. `:``,n.filter(e=>e.source===`demo`).length===n.length?`Showing a sample library so the canvas works before you point it at disk.`:`${n.length} indexed · ${O(g)}.`,m?` ${m}`:``]}),(0,Z.jsxs)(`div`,{className:`mt-6`,children:[(0,Z.jsx)(`button`,{type:`button`,className:`h-11 rounded-full bg-fg px-4 text-sm font-medium text-bg`,onClick:()=>Wt(`Start-LocGENStudio.ps1`,Vt(e)),children:`Download Windows starter`}),(0,Z.jsx)(`a`,{href:`/locgen-engine.zip`,download:!0,className:`inline-flex h-11 items-center rounded-full border border-line px-4 text-sm text-fg`,children:`Download engine`}),(0,Z.jsx)(`p`,{className:`mt-2 max-w-xl text-sm leading-relaxed text-muted`,children:`The starter creates diffusion_models, loras, text_encoders, vae, clip and the rest of the tree, writes locgen-manifest.json, and starts the engine in pythonembedded. Unzip the engine beside that folder first. Import the manifest here, then press Run.`})]}),(0,Z.jsx)(`pre`,{className:`mt-6 overflow-auto rounded-2xl border border-line bg-surface p-4 text-xs leading-relaxed text-fg`,children:Ht}),(0,Z.jsx)(`button`,{type:`button`,className:`mt-3 h-10 rounded-full border border-line px-4 text-sm text-fg`,onClick:()=>{d(`Checking…`),st(t).then(e=>d((e.ok,e.message)))},children:`Check engine`}),(0,Z.jsx)(`p`,{className:`mt-2 text-sm text-muted`,children:u})]}),(0,Z.jsxs)(`section`,{className:`rounded-2xl border border-line bg-surface`,children:[(0,Z.jsxs)(`header`,{className:`border-b border-line px-4 py-3`,children:[(0,Z.jsx)(`h3`,{className:`font-display text-2xl text-fg`,children:`Folder map`}),(0,Z.jsx)(`p`,{className:`text-sm text-muted`,children:`Counts from the library currently loaded.`})]}),(0,Z.jsx)(`ul`,{children:y.map(e=>{let t=n.filter(t=>t.folder===e.id);return(0,Z.jsxs)(`li`,{className:`border-b border-line px-4 py-3 last:border-b-0`,children:[(0,Z.jsxs)(`div`,{className:`flex items-baseline justify-between gap-3`,children:[(0,Z.jsx)(`p`,{className:`text-sm text-fg`,children:e.label}),(0,Z.jsx)(`p`,{className:`text-sm text-signal tabular-nums`,children:t.length})]}),(0,Z.jsxs)(`p`,{className:`text-xs text-muted`,children:[e.id,`/ · `,e.hint]})]},e.id)})})]})]})})}function Wt(e,t){let n=URL.createObjectURL(new Blob([t],{type:`text/plain`})),r=document.createElement(`a`);r.href=n,r.download=e,r.click(),URL.revokeObjectURL(n)}var Gt=[{id:`canvas`,label:`Canvas`,icon:h},{id:`library`,label:`Library`,icon:s},{id:`jobs`,label:`Runs`,icon:c},{id:`setup`,label:`Windows`,icon:d},{id:`docs`,label:`Docs`,icon:i}],Kt=[{kind:`diffusion`,label:`Diffusion`},{kind:`lora`,label:`LoRA`},{kind:`textEncoder`,label:`Text encoder`},{kind:`vae`,label:`VAE`},{kind:`image`,label:`Image`},{kind:`prompt`,label:`Prompt`},{kind:`enhance`,label:`Prompt enhancer`},{kind:`sampler`,label:`Sampler`},{kind:`preview`,label:`Preview`},{kind:`save`,label:`Save`}];function qt(){let e=X(e=>e.view),t=X(e=>e.setView),n=X(e=>e.workflows),r=X(e=>e.setActive),i=X(e=>e.renameActive),a=X(e=>e.addWorkflow),o=X(e=>e.deleteActive),s=Ue(),c=!!s.selectedId,[l,u]=(0,_.useState)(!1),[d,p]=(0,_.useState)(!1),[m,h]=(0,_.useState)(!1),[g,v]=(0,_.useState)(!1);(0,_.useEffect)(()=>{let e=!1,t=X.subscribe(t=>{e&&t.hydrated&&He(t)});return X.getState().hydrate(Ve()),e=!0,t},[]),(0,_.useEffect)(()=>{let e=e=>{e.target?.closest(`input, textarea, select`)||(e.key===`Delete`||e.key===`Backspace`)&&(e.preventDefault(),X.getState().removeSelected())};return window.addEventListener(`keydown`,e),()=>window.removeEventListener(`keydown`,e)},[]);function y(e){let t=X.getState(),n=t.workflows.find(e=>e.id===t.activeId);if(!n)return;let r=t.viewportPx.w>40?t.viewportPx:{w:900,h:700},i=We(n.pan,n.zoom,r);t.addKind(e,i.x,i.y),t.setView(`canvas`),p(!1),h(!0)}function b(e){let t=X.getState(),n=new Set(t.models.map(e=>e.id));for(let r of H())!n.has(r.id)&&e.nodes.some(e=>e.data.modelId===r.id)&&t.addModel(r);let r=structuredClone(e);r.id=T(`wf`),r.name=`${e.name} copy`,a(r),u(!1)}async function ee(){let e=X.getState(),t=e.workflows.find(t=>t.id===e.activeId);if(!t)return;let n=Oe(t,e.models),r=n.ok?ye(t,e.models):null,i=T(`job`);if(e.addJob({id:i,workflowName:t.name,createdAt:Date.now(),status:n.ok&&!r?`staged`:`error`,summary:n.summary,chain:n.chain,promptJson:JSON.stringify(Xt(n.prompt),null,2),message:r??(n.ok?`Checking the local engine…`:n.issues.find(e=>e.level===`error`)?.message??`Graph is incomplete`)}),e.setView(`jobs`),n.ok&&!r){v(!0);try{let t=await st(e.engineUrl);if(!t.ok){e.patchJob(i,{status:`staged`,message:t.message});return}e.patchJob(i,{status:`queued`,message:t.message});let r=await lt(e.engineUrl,n.prompt);e.patchJob(i,{status:`running`,message:`Queued on this PC`});let a=await ut(e.engineUrl,r,t=>e.patchJob(i,{message:t}));e.patchJob(i,{status:`done`,imageUrl:a??void 0,message:a?`Inference finished. The file is also in the engine output folder.`:`The engine finished without an image.`})}catch(t){e.patchJob(i,{status:`error`,message:ot(t)})}finally{v(!1)}}}let x=e===`canvas`||e===`library`,S=e===`library`;return(0,Z.jsxs)(`div`,{className:`flex h-dvh flex-col bg-bg text-fg md:flex-row`,children:[(0,Z.jsxs)(`aside`,{className:`hidden w-14 shrink-0 flex-col items-center gap-2 border-r border-line py-3 md:flex`,children:[(0,Z.jsx)(Jt,{}),Gt.map(n=>(0,Z.jsx)(Yt,{item:n,active:e===n.id,onClick:()=>t(n.id)},n.id))]}),(0,Z.jsxs)(`div`,{className:`flex min-w-0 flex-1 flex-col`,children:[(0,Z.jsxs)(`header`,{className:`flex h-14 shrink-0 items-center gap-2 border-b border-line px-3`,children:[(0,Z.jsxs)(`span`,{className:`flex shrink-0 items-center gap-2`,children:[(0,Z.jsx)(`span`,{className:`md:hidden`,children:(0,Z.jsx)(Jt,{})}),(0,Z.jsx)(`span`,{className:`font-display text-sm tracking-tight text-fg md:hidden`,children:`LocGEN`}),(0,Z.jsx)(`span`,{className:`hidden font-display text-base tracking-tight text-fg md:inline`,children:`LocGENStudio`})]}),(0,Z.jsx)(`div`,{className:`min-w-0 flex-1`,children:(0,Z.jsx)(`input`,{"aria-label":`Workflow name`,value:s.name,onChange:e=>i(e.target.value),className:`w-full truncate bg-transparent font-display text-lg text-fg outline-none`})}),(0,Z.jsxs)(`div`,{className:`relative`,children:[(0,Z.jsx)(`button`,{type:`button`,onClick:()=>u(e=>!e),className:`h-10 shrink-0 rounded-full border border-line px-3 text-sm text-fg`,children:`Graphs`}),l?(0,Z.jsxs)(`div`,{className:`absolute top-12 right-0 z-20 max-h-[70vh] w-64 overflow-auto rounded-2xl border border-line bg-surface p-1 shadow-lg`,children:[n.map(e=>(0,Z.jsx)(`button`,{type:`button`,className:`block w-full rounded-xl px-3 py-2 text-left text-sm text-fg`,onClick:()=>{r(e.id),u(!1),t(`canvas`)},children:e.name},e.id)),(0,Z.jsx)(`div`,{className:`my-1 border-t border-line`}),(0,Z.jsx)($,{label:`New Flux portrait`,onClick:()=>b(ae())}),(0,Z.jsx)($,{label:`New Flux Schnell`,onClick:()=>b(oe())}),(0,Z.jsx)($,{label:`New Flux 2 Klein`,onClick:()=>b(se())}),(0,Z.jsx)($,{label:`New Krea 2`,onClick:()=>b(ce())}),(0,Z.jsx)($,{label:`New Qwen Image 2.1`,onClick:()=>b(le())}),(0,Z.jsx)($,{label:`New Z-Image Turbo`,onClick:()=>b(ue())}),(0,Z.jsx)($,{label:`New Wan 2.2`,onClick:()=>b(de())}),(0,Z.jsx)($,{label:`New LTX 2.5`,onClick:()=>b(fe())}),(0,Z.jsx)($,{label:`New MiniMax H3`,onClick:()=>b(pe())}),(0,Z.jsx)($,{label:`New image edit`,onClick:()=>b(he())}),(0,Z.jsx)($,{label:`New SDXL`,onClick:()=>b(me())}),(0,Z.jsx)($,{label:`Empty graph`,onClick:()=>{a(Ge(`Untitled`)),u(!1)}}),(0,Z.jsx)($,{label:`Delete this graph`,onClick:()=>{o(),u(!1)}})]}):null]}),(0,Z.jsxs)(`div`,{className:`relative`,children:[(0,Z.jsx)(`button`,{type:`button`,"aria-label":`Add node`,onClick:()=>p(e=>!e),className:`flex size-10 items-center justify-center rounded-full border border-line`,children:(0,Z.jsx)(f,{className:`size-4`})}),d?(0,Z.jsx)(`div`,{className:`absolute top-12 right-0 z-20 w-48 rounded-2xl border border-line bg-surface p-1`,children:Kt.map(e=>(0,Z.jsx)(`button`,{type:`button`,draggable:!0,className:`block w-full cursor-grab rounded-xl px-3 py-2 text-left text-sm`,onDragStart:t=>{t.dataTransfer.setData(`text/plain`,`node:${e.kind}`),t.dataTransfer.effectAllowed=`copy`},onClick:()=>y(e.kind),children:e.label},e.kind))}):null]}),(0,Z.jsx)(`button`,{type:`button`,onClick:()=>void ee(),disabled:g,className:`h-10 rounded-full bg-accent px-4 text-sm font-medium text-accent-ink disabled:opacity-60`,children:g?`Running`:`Run`})]}),(0,Z.jsxs)(`div`,{className:`flex min-h-0 flex-1`,children:[S?(0,Z.jsx)(`div`,{className:e===`library`?`h-full min-h-0 w-full md:w-80 md:shrink-0 md:border-r md:border-line`:`hidden`,children:(0,Z.jsx)(kt,{})}):null,x?(0,Z.jsxs)(`div`,{className:e===`library`?`relative hidden min-h-0 min-w-0 flex-1 md:block`:`relative min-h-0 min-w-0 flex-1`,children:[(0,Z.jsx)(`div`,{className:`absolute inset-0`,children:(0,Z.jsx)(Je,{})}),c&&e===`canvas`?(0,Z.jsxs)(`div`,{className:`absolute inset-x-0 bottom-0 z-10 xl:hidden`,children:[(0,Z.jsxs)(`button`,{type:`button`,className:`flex h-12 w-full items-center justify-between border-t border-line bg-surface px-4 text-left`,onClick:()=>h(e=>!e),children:[(0,Z.jsx)(`span`,{className:`truncate text-sm text-fg`,children:s.name}),(0,Z.jsx)(`span`,{className:`text-xs tracking-widest text-muted uppercase`,children:m?`Hide`:`Edit`})]}),m?(0,Z.jsx)(`div`,{className:`max-h-[46vh] overflow-auto border-t border-line bg-surface`,children:(0,Z.jsx)(gt,{dock:!0})}):null]}):null]}):null,e===`jobs`?(0,Z.jsx)(`div`,{className:`min-w-0 flex-1`,children:(0,Z.jsx)(Et,{})}):null,e===`setup`?(0,Z.jsx)(`div`,{className:`min-w-0 flex-1`,children:(0,Z.jsx)(Ut,{})}):null,e===`docs`?(0,Z.jsx)(`div`,{className:`min-w-0 flex-1`,children:(0,Z.jsx)(at,{})}):null,c&&(e===`canvas`||e===`library`)?(0,Z.jsx)(`div`,{className:`hidden w-80 shrink-0 xl:block`,children:(0,Z.jsx)(gt,{})}):null]}),(0,Z.jsx)(`nav`,{className:`flex h-14 shrink-0 border-t border-line md:hidden`,children:Gt.map(n=>{let r=n.icon,i=e===n.id;return(0,Z.jsxs)(`button`,{type:`button`,onClick:()=>t(n.id),className:`flex flex-1 flex-col items-center justify-center gap-0.5`,children:[(0,Z.jsx)(r,{className:`size-5 ${i?`text-signal`:`text-muted`}`}),(0,Z.jsx)(`span`,{className:`text-xs ${i?`text-fg`:`text-muted`}`,children:n.label})]},n.id)})})]})]})}function Jt(){return(0,Z.jsx)(`span`,{className:`flex size-9 items-center justify-center text-signal`,"aria-hidden":`true`,children:(0,Z.jsxs)(`svg`,{viewBox:`0 0 32 32`,className:`size-7`,children:[(0,Z.jsx)(`rect`,{x:`3`,y:`3`,width:`26`,height:`26`,rx:`7`,fill:`none`,stroke:`currentColor`,strokeWidth:`1.6`}),(0,Z.jsx)(`circle`,{cx:`10`,cy:`10`,r:`2.1`,fill:`currentColor`}),(0,Z.jsx)(`circle`,{cx:`22`,cy:`10`,r:`2.1`,fill:`currentColor`}),(0,Z.jsx)(`circle`,{cx:`22`,cy:`22`,r:`2.1`,fill:`currentColor`}),(0,Z.jsx)(`path`,{d:`M10 10h12v12`,fill:`none`,stroke:`currentColor`,strokeWidth:`1.6`,strokeLinejoin:`round`})]})})}function Yt({item:e,active:t,onClick:n}){let r=e.icon;return(0,Z.jsx)(`button`,{type:`button`,"aria-label":e.label,"aria-pressed":t,onClick:n,className:`flex size-11 items-center justify-center rounded-xl ${t?`bg-surface text-signal`:`text-muted`}`,children:(0,Z.jsx)(r,{className:`size-5`})})}function $({label:e,onClick:t}){return(0,Z.jsx)(`button`,{type:`button`,className:`block w-full rounded-xl px-3 py-2 text-left text-sm text-muted`,onClick:t,children:e})}function Xt(e){let t=structuredClone(e);for(let e of Object.values(t))if(e?.inputs)for(let[t,n]of Object.entries(e.inputs))typeof n==`string`&&n.startsWith(`data:image`)&&(e.inputs[t]=`[image ${Math.round(n.length/1024)} KB]`);return t}function Zt(){return(0,Z.jsx)(qt,{})}export{Zt as component};