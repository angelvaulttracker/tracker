"""Local photo cutout workflow, explicitly authorized by the user.
Requires Pillow, numpy, scipy, rembg and a cached u2net model.
"""
from pathlib import Path
import argparse, os
os.environ.setdefault("NUMBA_CACHE_DIR", "/tmp/sonnies-numba-cache")
from PIL import Image,ImageDraw,ImageFont
import numpy as np
from rembg import remove,new_session
from scipy import ndimage
import json
root=Path(__file__).resolve().parents[1]
parser=argparse.ArgumentParser(description='Extract Easter cutouts locally from supplied product photos; never generate figure pixels.')
parser.add_argument('--source-dir',type=Path,required=True)
parser.add_argument('--only',default='')
args=parser.parse_args()
source=args.source_dir
out=root/'app/assets/manual/easter-user-sources';out.mkdir(parents=True,exist_ok=True)
config=[
('2017-easter-bunny','s-l1600 (1).webp',(35,30,295,640)),
('2017-egg-bonnet','s-l1600 (1).webp',(300,100,560,640)),
('2017-easter-lamb','s-l1600 (1).webp',(560,140,830,640)),
('2017-clover-field','s-l1600 (1).webp',(835,140,1090,640)),
('2018-easter-lamb','sonnyangel_easter2018_ovr__61970.webp',(10,205,190,540)),
('2018-hatched-egg','sonnyangel_easter2018_ovr__61970.webp',(190,205,355,540)),
('2018-easter-cow','sonnyangel_easter2018_ovr__61970.webp',(355,205,523,540)),
('2018-easter-bunny','sonnyangel_easter2018_ovr__61970.webp',(530,135,700,540)),
('2018-paint-robby-angel','5_d1bdd1e6-a995-4c22-9df5-38be5bf57c53_large.webp',(130,55,355,465)),
('2018-hatched-egg-secret','652eb54139e4ab4dc3c1b6b7_1728653463754_IMG_8206_5000x.webp',(390,240,1220,1790)),
('2017-egg-bonnet-secret','P0.jpg',(410,200,865,1135)),
('2017-bunny-robby-angel','SonnyEaster20177_1024x1024@2x.webp',(0,0,1754,2048)),
]
session=new_session('u2net',providers=['CPUExecutionProvider'])
manifest=[]
for name,filename,box in config:
 if args.only and name not in args.only.split(','): continue
 im=Image.open(source/filename).convert('RGB').crop(box)
 result=remove(im,session=session,post_process_mask=True).convert('RGBA')
 # Keep the source RGB values even where rembg masked a pixel out.
 mask=result.getchannel('A');result=im.convert('RGBA');result.putalpha(mask)
 # Keep the central main component; detached specks are not part of the toy.
 a=np.array(result.getchannel('A'));labels,n=ndimage.label(a>128);counts=np.bincount(labels.ravel());counts[0]=0
 if n:
  keep=ndimage.binary_dilation(labels==np.argmax(counts),iterations=2);a[~keep]=0
 result.putalpha(Image.fromarray(a))
 # Restore the pale left lamb ear omitted by the learned mask. This hand-traced
 # alpha contour exposes original photo pixels; it does not paint new RGB pixels.
 if name=='2017-easter-lamb':
  scale=4;ear=Image.new('L',(im.width*scale,im.height*scale))
  polygon=[(5,119),(9,119),(13,123),(22,123),(38,119),(50,114),(58,109),(60,130),(48,134),(34,138),(19,138),(10,135),(5,130),(3,124)]
  ImageDraw.Draw(ear).polygon([(x*scale,y*scale) for x,y in polygon],fill=255)
  ear=ear.resize(im.size,Image.Resampling.LANCZOS)
  result.putalpha(Image.fromarray(np.maximum(np.asarray(result.getchannel('A')),np.asarray(ear))))
 bbox=result.getbbox()
 if bbox:result=result.crop(bbox)
 padded=Image.new('RGBA',(result.width+16,result.height+16));padded.alpha_composite(result,(8,8));padded.save(out/(name+'.png'))
 manifest.append({'asset':name+'.png','source_file':filename,'crop_box':box,'method':'local u2net segmentation; original RGB pixels retained','dimensions':padded.size})
 if name=='2017-easter-lamb':manifest[-1]['alpha_refinement']='Hand-traced pale left ear; restored original source RGB pixels'
 print(name,padded.size,flush=True)
old=json.loads((out/'sources.json').read_text()) if (out/'sources.json').exists() else []
merged={i['asset']:i for i in old}
merged.update({i['asset']:i for i in manifest})
(out/'sources.json').write_text(json.dumps(list(merged.values()),indent=2))
font=ImageFont.truetype('/System/Library/Fonts/Supplemental/Arial.ttf',15)
sheet=Image.new('RGB',(1200,((len(config)+3)//4)*435),'#f9f4ed');draw=ImageDraw.Draw(sheet)
for n,(name,_,_) in enumerate(config):
 im=Image.open(out/(name+'.png'));im.thumbnail((260,355));x=(n%4)*300;y=(n//4)*435
 for a in range(0,300,15):
  for b in range(0,390,15):draw.rectangle((x+a,y+b,x+a+14,y+b+14),fill='#e6e1db' if (a//15+b//15)%2 else '#f6f3ee')
 sheet.paste(im,(x+(300-im.width)//2,y+390-im.height),im)
 draw.text((x+10,y+400),name,font=font,fill='#382f2a')
preview=root/'deliverables/easter-cutouts';preview.mkdir(parents=True,exist_ok=True);sheet.save(preview/'preview.jpg',quality=94)
