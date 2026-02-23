import { getTranslations } from 'next-intl/server'
import { Button } from '@/components/ui/button'

export async function SafetyFooter() {
  const t = await getTranslations('safety.footer')

  return (
    <section className="w-full h-128 flex items-center justify-center px-4" style={{ background: 'linear-gradient(180deg, rgba(123, 149, 171, 0.57) 0%, rgba(0, 0, 0, 0.57) 100%), #000000' }}  >
      <div className="flex flex-col items-start md:items-center justify-between md:justify-center gap-10 w-full max-w-203 h-full py-12">
        <div className="flex flex-col items-start md:items-center gap-6">
          <h2 className="text-background whitespace-pre-line text-left! md:text-center! text-[36px]! w-full">{t('title')}</h2>
          <h3 className="text-background text-left md:text-center md:whitespace-pre-line italic">{t('description')}</h3>
        </div>
        <Button className="md:mt-0">{t('button')}</Button>
      </div>
    </section>
  )
}