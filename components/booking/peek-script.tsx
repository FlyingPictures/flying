import Script from "next/script";
import { PEEK_WIDGET_KEY } from "@/lib/package-catalog";

export function PeekScript() {
  return (
    <Script id="peek-booking-config" strategy="afterInteractive">
      {`(function(config) {
        window._peekConfig = config;
        if (document.getElementById('peek-book-button-js')) return;
        var head = document.head;
        var date = new Date();
        var stamp = date.getMonth() + '-' + date.getDate();
        var script = document.createElement('script');
        script.id = 'peek-book-button-js';
        script.src = 'https://js.peek.com/widget_button.js?ts=' + stamp;
        head.appendChild(script);
        var css = document.createElement('link');
        css.id = 'peek-book-button-css';
        css.href = 'https://js.peek.com/widget_button.css?ts=' + stamp;
        css.rel = 'stylesheet';
        head.appendChild(css);
      })({key: '${PEEK_WIDGET_KEY}'});`}
    </Script>
  );
}
