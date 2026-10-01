const {chromium}=require('/Users/enriquevelasco/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const fs=require('fs');
const path=require('path');
(async()=>{
 const browser=await chromium.launch({headless:true,executablePath:'/Users/enriquevelasco/Library/Caches/ms-playwright/chromium_headless_shell-1228/chrome-headless-shell-mac-arm64/chrome-headless-shell'});
 const page=await browser.newPage({viewport:{width:1440,height:1000},deviceScaleFactor:1});
 const errors=[];
 page.on('pageerror',e=>errors.push(e.message));
 page.on('console',m=>{if(m.type()==='error')errors.push(m.text())});
 page.on('response',r=>{if(r.status()>=400) errors.push(`${r.status()} ${r.url()}`)});
 const checks=[];
 const check=(name,pass)=>{checks.push({name,pass});if(!pass)throw new Error(name)};
 await page.goto('http://127.0.0.1:8765/',{waitUntil:'networkidle'});
 await page.screenshot({path:path.join(__dirname,'desktop-home.png'),fullPage:true,animations:'disabled'});
 await page.screenshot({path:path.join(__dirname,'desktop-first-screen.png'),animations:'disabled'});
 check('Seven packages',await page.locator('.package-card').count()===7);
 check('All images load',await page.locator('img').evaluateAll(imgs=>imgs.every(i=>i.complete&&i.naturalWidth>0)));
 await page.locator('[data-filter="shared"]').click();
 check('Three shared packages',await page.locator('.package-card:visible').count()===3);
 await page.locator('[data-filter="private"]').click();
 check('Four private packages',await page.locator('.package-card:visible').count()===4);
 await page.locator('[data-filter="all"]').click();
 for(const slug of ['essential','pyramids','premium','celebration','traveler','private','charter']){
   await page.locator(`.details-link[data-package="${slug}"]`).click();
   check(`${slug} modal opens`,await page.locator('dialog').isVisible());
   check(`${slug} WhatsApp names correct package`,(await page.locator('dialog .detail-bottom a').getAttribute('href')).startsWith('https://wa.me/525510484758?text='));
   await page.keyboard.press('Escape');
   check(`${slug} Escape closes and restores focus`,await page.locator(`.details-link[data-package="${slug}"]`).evaluate(e=>e===document.activeElement));
 }
 await page.locator('[data-language="en"]').click();
 check('English language switch',await page.locator('html').getAttribute('lang')==='en');
 await page.goto('http://127.0.0.1:8765/',{waitUntil:'networkidle'});
 check('Language preference remembered',await page.locator('html').getAttribute('lang')==='en');
 await page.locator('.details-link[data-package="premium"]').click();
 await page.screenshot({path:path.join(__dirname,'desktop-detail-en.png'),animations:'disabled'});
 check('English WhatsApp message',decodeURIComponent(await page.locator('dialog .detail-bottom a').getAttribute('href')).includes('Hello, I am interested'));
 await page.keyboard.press('Escape');
 for(const lang of ['es','en']){
   for(const slug of ['essential','pyramids','premium','celebration','traveler','private','charter']){
     await page.goto(`http://127.0.0.1:8765/${lang==='en'?'en/':''}packages/${slug}.html`);
     check(`${lang}/${slug} standalone page`,await page.locator('h1').count()===1);
     check(`${lang}/${slug} images`,await page.locator('img').evaluateAll(imgs=>imgs.every(i=>i.complete&&i.naturalWidth>0)));
   }
 }
 for(const width of [390,320,768]){
   await page.setViewportSize({width,height:844});
   await page.goto('http://127.0.0.1:8765/?lang=es',{waitUntil:'networkidle'});
   check(`No horizontal overflow at ${width}px`,await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
   if(width===390){await page.screenshot({path:path.join(__dirname,'mobile-home.png'),fullPage:true,animations:'disabled'});await page.screenshot({path:path.join(__dirname,'mobile-first-screen.png'),animations:'disabled'});}
   await page.locator('.details-link[data-package="charter"]').click();
   check(`Modal fits ${width}px`,await page.locator('dialog').evaluate(d=>d.scrollWidth<=d.clientWidth));
   await page.locator('dialog .extras summary').click();
   if(width===390)await page.screenshot({path:path.join(__dirname,'mobile-detail.png')});
   await page.keyboard.press('Escape');
 }
 const nojs=await browser.newContext({javaScriptEnabled:false,viewport:{width:390,height:844}});
 const fallback=await nojs.newPage();
 await fallback.goto('http://127.0.0.1:8765/');
 await fallback.locator('.details-link[data-package="essential"]').click();
 check('Details work without JavaScript',fallback.url().endsWith('/packages/essential.html'));
 await fallback.locator('[data-language="en"]').click();
 check('Package language switch works without JavaScript',new URL(fallback.url()).pathname.endsWith('/en/packages/essential.html'));
 check('No browser or HTTP errors',errors.length===0);
 fs.writeFileSync(path.join(__dirname,'verification.json'),JSON.stringify({checks,errors},null,2));
 console.log(JSON.stringify({passed:checks.length,errors},null,2));
 await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});
