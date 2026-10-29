import React, { useEffect, useRef, useState } from 'react';

declare global {
  interface Window {
    turnstile?: {
      render: (
        container: HTMLElement | string,
        params: {
          sitekey: string;
          action?: string;
          callback?: (token: string) => void;
          'error-callback'?: (errorCode: string) => void;
          'expired-callback'?: () => void;
          theme?: 'light' | 'dark' | 'auto';
        }
      ) => string;
      reset: (widgetId: string) => void;
      remove: (widgetId: string) => void;
    };
  }
}

interface TurnstileWidgetProps {
  onVerify: (token: string) => void;
  onExpire?: () => void;
  onError?: (err: string) => void;
  action?: string;
}

export const TurnstileWidget: React.FC<TurnstileWidgetProps> = ({
  onVerify,
  onExpire,
  onError,
  action,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);

  const siteKey = import.meta.env.VITE_TURNSTILE_SITE_KEY as string | undefined;
  const isKeyConfigured = Boolean(
    siteKey && siteKey.trim() !== '' && !siteKey.includes('placeholder') && !siteKey.includes('0x4AAAAAA...')
  );

  useEffect(() => {
    // If not configured, issue mock development token so forms work in local dev
    if (!isKeyConfigured) {
      onVerify('TEST_PASS_TOKEN');
      return;
    }

    // Check if script already exists
    if (!document.getElementById('turnstile-script')) {
      const script = document.createElement('script');
      script.id = 'turnstile-script';
      script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
      script.async = true;
      script.defer = true;
      script.onload = () => setIsScriptLoaded(true);
      document.head.appendChild(script);
    } else if (window.turnstile) {
      setIsScriptLoaded(true);
    }
  }, [isKeyConfigured, onVerify]);

  useEffect(() => {
    if (!isKeyConfigured || !isScriptLoaded || !containerRef.current || !window.turnstile) {
      return;
    }

    try {
      widgetIdRef.current = window.turnstile.render(containerRef.current, {
        sitekey: siteKey!,
        action: action,
        callback: (token) => onVerify(token),
        'expired-callback': () => onExpire && onExpire(),
        'error-callback': (code) => onError && onError(code),
        theme: 'auto',
      });
    } catch (err: any) {
      console.warn('[Turnstile Widget] Render error:', err?.message || err);
    }

    return () => {
      if (widgetIdRef.current && window.turnstile) {
        try {
          window.turnstile.remove(widgetIdRef.current);
        } catch {
          // Ignore cleanup errors
        }
      }
    };
  }, [isScriptLoaded, isKeyConfigured, siteKey, onVerify, onExpire, onError]);

  if (!isKeyConfigured) {
    return null; // Silent in development when Turnstile key is absent
  }

  return (
    <div className="my-2 flex justify-center">
      <div ref={containerRef} className="cf-turnstile" />
    </div>
  );
};
