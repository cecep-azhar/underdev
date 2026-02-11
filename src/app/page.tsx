'use client';

import { useState, useEffect } from 'react';
import StarBackground from '@/components/StarBackground';
import Countdown from '@/components/Countdown';
import Footer from '@/components/Footer';
import { content } from '@/data/locales';
import Image from 'next/image';


export default function Home() {
  // logic to determine language
  const [lang, setLang] = useState<'id' | 'en'>('id'); // Default to ID initially to match user request "default Indonesia"
  useEffect(() => {
    // Check browser language
    const browserLang = (navigator.language || (navigator.languages && navigator.languages[0])) || 'id';
    
    // Simple logic: Default is 'id'. Only switch if we detect something else.
    if (!browserLang.toLowerCase().startsWith('id')) {
      setLang('en');
    }
  }, []);

  const t = content[lang];

  return (
    <>
      <StarBackground />
      <main>
        {/* Prevent hydration mismatch by only showing text after mount or using a safe default. 
            However, for SEO, server rendered text is better. 
            Since we're doing client-side detection without middleware, we accept a potential re-render. 
            To be safe, we can default to ID (as requested) and then switch if needed.
        */}
        <div className="hana-container">
          <Image 
            src="/HanaMenyapa.png" 
            alt="Hana Menyapa" 
            fill
            style={{ 
              objectFit: 'cover', 
              objectPosition: 'top center',
            }}
            priority
          />
        </div>
        <h1>{t.headline}</h1>
        <p>{t.subheadline}</p>
        <Countdown labels={t.countdown} />
      </main>
      <Footer madeWith={t.footer.madeWith} by={t.footer.by} />
    </>
  );
}
