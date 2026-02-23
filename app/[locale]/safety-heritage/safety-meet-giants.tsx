import { getTranslations } from 'next-intl/server'
import { CloudinaryImage } from '@/components/CloudinaryImage'
import { IMAGES } from '@/lib/images'

const DECORATIVE = "font-['Libre_Baskerville'] tracking-[-0.03em]"
const CARD_OVERLAY = 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.65) 100%)'

export async function SafetyMeetGiants() {
  const t = await getTranslations('safety.meetGiants')
  const cards = t.raw('cards') as Record<string, { name: string; subname: string; description: string; capacity: string; mission: string }>
  const banner = t.raw('banner') as { title: string; subtitle: string; cardtitle: string; cardsubtitle: string; carddescription: string; cardsubdescription: string; carddescription2: string; cardsubdescription2: string; carddescription3: string; cardsubdescription3: string }
  const images = IMAGES.safety.meetGiants.cards

  const bannerItems = [
    { name: banner.carddescription, desc: banner.cardsubdescription, icon: <HeartIcon /> },
    { name: banner.carddescription2, desc: banner.cardsubdescription2, icon: <BirdIcon /> },
    { name: banner.carddescription3, desc: banner.cardsubdescription3, icon: <RocketIcon /> },
  ]

  return (
    <section
      className="w-full flex flex-col px-[clamp(16px,6.94vw,100px)]"
      style={{ background: 'linear-gradient(180deg, #dae2e8 0%, #7B95AB 13.51%, #9497AD 29.86%, #000000 68.01%)' }}
    >
      {/* HEADER */}
      <div className="flex flex-col items-center text-center gap-4 py-[clamp(40px,5vw,80px)]">
        <h2>{t('title')}</h2>
        <p className="max-w-[916px]">{t('description')}</p>
      </div>

      {/* CARDS */}
      <div className="flex flex-col items-center pb-[clamp(40px,5vw,80px)]">

        {/* Labels desktop */}
        <div className="hidden md:flex flex-row gap-[clamp(16px,4.72vw,68px)] w-full max-w-[1231px] pb-8">
          {[
            { label: t('subtitle'), desc: t('description2'), cls: 'flex-1' },
            { label: t('subtitle2'), desc: t('description3'), cls: 'flex-[2]' },
          ].map(({ label, desc, cls }) => (
            <div key={label} className={`flex flex-col gap-2 ${cls}`}>
              <h4>{label}</h4>
              <span className={`${DECORATIVE} text-[clamp(20px,1.67vw,24px)] leading-[30px]`}>{desc}</span>
            </div>
          ))}
        </div>

        <MobileLabel title={t('subtitle')} desc={t('description2')} />

        <div className="flex flex-col md:flex-row gap-x-[clamp(16px,4.72vw,68px)] gap-y-10 md:gap-y-0 w-full max-w-[1231px]">
          <BalloonCard image={images[0]} card={cards['1']} />
          <MobileLabel title={t('subtitle2')} desc={t('description3')} />
          <BalloonCard image={images[1]} card={cards['2']} />
          <BalloonCard image={images[2]} card={cards['3']} />
        </div>
      </div>

      {/* LEGACY BANNER */}
      <div className="flex flex-col gap-6 max-w-[1220px] w-full mx-auto pb-[clamp(40px,5vw,80px)]">
        <div className="flex flex-col gap-2 text-center lg:text-left">
          <h4 className="text-background">{banner.title}</h4>
          <span className={`${DECORATIVE} text-xl leading-[30px] text-background`}>{banner.subtitle}</span>
        </div>

        <div className="relative w-full h-[437px] rounded-[22px] overflow-hidden">
          <CloudinaryImage publicId={IMAGES.safety.meetGiants.banner} alt={banner.cardtitle} fill className="object-cover object-center" />
          <div className="absolute inset-0 flex flex-col justify-end p-[clamp(16px,2.22vw,32px)] gap-2" style={{ background: CARD_OVERLAY }}>
            <span className={`${DECORATIVE} italic text-[clamp(20px,2.22vw,32px)] leading-[1.234] text-background`}>{banner.cardtitle}</span>
            <span className="text-background text-sm font-medium">{banner.cardsubtitle}</span>
          </div>
        </div>

        <div className="flex flex-col gap-6 mb-[120px] mt-6 pl-4 md:pl-0">
          {bannerItems.map((item, i) => (
            <div key={i} className="flex items-start gap-3">
              <div className="shrink-0 w-8 h-8">{item.icon}</div>
              <div className="flex flex-col gap-0.5">
                <span className="font-bold text-sm text-background">{item.name}</span>
                <span className="text-sm text-background/80 font-medium">{item.desc}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function MobileLabel({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="flex flex-col items-center text-center gap-4 py-10 md:hidden">
      <h4 className="text-background">{title}</h4>
      <span className={`font-['Libre_Baskerville'] tracking-[-0.03em] text-xl leading-6 text-background`}>{desc}</span>
    </div>
  )
}

function BalloonCard({ image, card }: { image: string; card: { name: string; subname: string; description: string; capacity: string; mission: string } }) {
  return (
    <div className="flex flex-col gap-6 w-full md:flex-1">
      <div className="relative w-full h-[437px] rounded-[22px] overflow-hidden shrink-0">
        <CloudinaryImage publicId={image} alt={card.name} fill className="object-cover object-center" />
        <div className="absolute inset-0 flex flex-col justify-end p-[clamp(1rem,2.22vw,2rem)] gap-2" style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0) 40%, rgba(0,0,0,0.65) 100%)' }}>
          <span className={`font-['Libre_Baskerville'] italic tracking-[-0.03em] text-2xl text-background`}>{card.name}</span>
          <span className="text-background text-sm font-medium">{card.subname}</span>
        </div>
      </div>
      <span className="text-background text-sm leading-5">{card.description}</span>
      <div className="flex flex-col gap-3 text-background text-sm leading-5">
        {[{ icon: <PersonIcon />, text: card.capacity }, { icon: <TargetIcon />, text: card.mission }].map(({ icon, text }, i) => (
          <div key={i} className="flex items-center gap-3">{icon}<span>{text}</span></div>
        ))}
      </div>
    </div>
  )
}

function PersonIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 17 16" fill="white" className="shrink-0">
      <path d="M8.25 7.56225C9.25282 7.56225 10.2146 7.16388 10.9237 6.45478C11.6328 5.74569 12.0311 4.78394 12.0311 3.78112C12.0311 2.77831 11.6328 1.81656 10.9237 1.10747C10.2146 0.398367 9.25282 0 8.25 0C7.24718 0 6.28544 0.398367 5.57634 1.10747C4.86724 1.81656 4.46887 2.77831 4.46887 3.78112C4.46887 4.78394 4.86724 5.74569 5.57634 6.45478C6.28544 7.16388 7.24718 7.56225 8.25 7.56225ZM8.25 9.2235C3.22275 9.2235 0 11.9977 0 13.3485V15.8707H16.5V13.3485C16.5 11.715 13.449 9.2235 8.25 9.2235Z"/>
    </svg>
  )
}

function TargetIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="white" className="shrink-0">
      <path d="M23.175 4.20011C23.1 3.90011 22.8 3.75011 22.5 3.75011H20.25V1.50011C20.25 1.20011 20.1 0.900109 19.8 0.825109C19.5 0.675109 19.2 0.750109 18.975 0.975109L15.975 3.97511C15.825 4.12511 15.75 4.27511 15.75 4.50011V7.20011L11.475 11.4751C11.175 11.7751 11.175 12.2251 11.475 12.5251C11.625 12.6751 11.85 12.7501 12 12.7501C12.15 12.7501 12.375 12.6751 12.525 12.5251L16.8 8.25011H19.5C19.725 8.25011 19.875 8.17511 20.025 8.02511L23.025 5.02511C23.25 4.80011 23.325 4.50011 23.175 4.20011Z"/>
      <path d="M13.575 13.575C13.2 14.025 12.6 14.25 12 14.25C11.4 14.25 10.8 14.025 10.425 13.575C9.525 12.675 9.525 11.25 10.425 10.425L12.525 8.325C12.375 8.25 12.15 8.25 12 8.25C9.9 8.25 8.25 9.9 8.25 12C8.25 14.1 9.9 15.75 12 15.75C14.1 15.75 15.75 14.1 15.75 12C15.75 11.85 15.75 11.625 15.675 11.475L13.575 13.575Z"/>
      <path d="M21.075 9.075C20.7 9.525 20.1 9.75 19.5 9.75H17.4L16.875 10.275C17.1 10.8 17.175 11.4 17.175 12C17.175 14.925 14.85 17.25 11.925 17.25C9 17.25 6.675 14.925 6.675 12C6.675 9.075 9 6.75 11.925 6.75C12.525 6.75 13.125 6.9 13.65 7.05L14.25 6.6V4.5C14.25 3.9 14.475 3.3 14.925 2.925L15.675 2.175C14.475 1.725 13.275 1.5 12 1.5C6.225 1.5 1.5 6.225 1.5 12C1.5 17.775 6.225 22.5 12 22.5C17.775 22.5 22.5 17.775 22.5 12C22.5 10.725 22.275 9.525 21.825 8.325L21.075 9.075Z"/>
    </svg>
  )
}

function HeartIcon() {
  return (
    <svg width="22" height="21" viewBox="0 0 20 19" fill="white" className="shrink-0">
      <path d="M18.5028 2.11164C17.9553 1.44923 17.2677 0.916497 16.4896 0.551809C15.7114 0.187121 14.8621 -0.000440036 14.0028 0.00263663C12.5324 -0.0418843 11.1009 0.478827 10.0028 1.45764C8.90463 0.478827 7.47312 -0.0418843 6.00275 0.00263663C5.1434 -0.000440036 4.29406 0.187121 3.51592 0.551809C2.73778 0.916497 2.05022 1.44923 1.50275 2.11164C0.549754 3.26764 -0.447246 5.36064 0.213754 8.77164C1.26875 14.2186 9.17975 18.6886 9.51375 18.8716C9.66264 18.9547 9.83028 18.9982 10.0008 18.9982C10.1712 18.9982 10.3389 18.9547 10.4878 18.8716C10.8238 18.6846 18.7348 14.2146 19.7878 8.77164C20.4528 5.36064 19.4558 3.26764 18.5028 2.11164ZM17.8288 8.39164C17.0828 12.2426 11.6608 15.8246 10.0028 16.8426C7.66675 15.4326 2.86075 11.8926 2.18175 8.39164C1.66875 5.74564 2.37075 4.20864 3.05075 3.38464C3.41036 2.95075 3.86153 2.60182 4.37191 2.36288C4.88229 2.12395 5.43922 2.00092 6.00275 2.00264C6.60465 1.9575 7.20796 2.06909 7.75389 2.32654C8.29981 2.58399 8.7697 2.97851 9.11775 3.47164C9.20358 3.62957 9.3302 3.7616 9.4844 3.85395C9.63861 3.94631 9.81476 3.99562 9.99451 3.99674C10.1743 3.99787 10.351 3.95076 10.5064 3.86034C10.6617 3.76992 10.79 3.63949 10.8778 3.48264C11.2251 2.98567 11.696 2.58781 12.244 2.32829C12.792 2.06876 13.3982 1.95652 14.0028 2.00264C14.5675 1.99989 15.1258 2.12241 15.6374 2.36139C16.1491 2.60036 16.6014 2.94983 16.9618 3.38464C17.6398 4.20864 18.3418 5.74564 17.8288 8.39164Z"/>
    </svg>
  )
}

function BirdIcon() {
  return (
    <svg width="30" height="30" viewBox="0 0 24 24" fill="white" className="shrink-0">
      <path d="M22.7007 3.54997C22.7947 3.64297 22.8694 3.7537 22.9203 3.87574C22.9713 3.99778 22.9975 4.12872 22.9975 4.26097C22.9975 4.39322 22.9713 4.52416 22.9203 4.6462C22.8694 4.76825 22.7947 4.87897 22.7007 4.97197L18.7707 8.86197C20.2804 10.7028 21.0475 13.0414 20.9213 15.4187C20.7951 17.7961 19.7848 20.0403 18.0887 21.711C17.9015 21.896 17.6489 21.9998 17.3857 21.9998C17.1225 21.9998 16.8699 21.896 16.6827 21.711L11.5007 16.59L9.04671 21.451C8.9756 21.5917 8.87221 21.7136 8.745 21.8068C8.61778 21.8999 8.47034 21.9617 8.31471 21.987C8.26184 21.9958 8.20832 22.0001 8.15471 22C7.89252 21.9991 7.64114 21.8953 7.45471 21.711L1.30071 15.624C1.18754 15.512 1.10276 15.3745 1.05341 15.2231C1.00407 15.0717 0.991598 14.9107 1.01703 14.7535C1.04246 14.5963 1.10507 14.4475 1.19963 14.3194C1.2942 14.1913 1.41799 14.0876 1.56071 14.017L6.46071 11.595L1.30071 6.49297C1.20668 6.39997 1.13203 6.28925 1.08109 6.1672C1.03014 6.04516 1.00391 5.91422 1.00391 5.78197C1.00391 5.64972 1.03014 5.51878 1.08109 5.39674C1.13203 5.2747 1.20668 5.16397 1.30071 5.07097C2.67152 3.7128 4.41512 2.79276 6.30999 2.42775C8.20486 2.06273 10.1655 2.26922 11.9427 3.02097C12.0687 3.06824 12.1838 3.14043 12.2812 3.23323C12.3786 3.32603 12.4563 3.43753 12.5096 3.56106C12.5629 3.68459 12.5907 3.8176 12.5914 3.95213C12.5921 4.08666 12.5656 4.21995 12.5136 4.34401C12.4615 4.46807 12.385 4.58036 12.2885 4.67415C12.1921 4.76794 12.0777 4.84131 11.9522 4.88985C11.8268 4.9384 11.6928 4.96113 11.5583 4.95668C11.4239 4.95223 11.2917 4.9207 11.1697 4.86397C9.91481 4.33347 8.54221 4.14326 7.19033 4.3125C5.83845 4.48175 4.55511 5.00448 3.46971 5.82797L8.85771 11.158C8.97109 11.27 9.05606 11.4075 9.10553 11.559C9.15499 11.7105 9.16753 11.8716 9.14209 12.029C9.11665 12.1863 9.05397 12.3353 8.95927 12.4635C8.86458 12.5917 8.74062 12.6954 8.59771 12.766L3.70071 15.188L7.88171 19.323L10.3387 14.462C10.4096 14.3205 10.5131 14.1979 10.6406 14.1042C10.7681 14.0105 10.9161 13.9485 11.0723 13.9231C11.2285 13.8977 11.3884 13.9097 11.5391 13.9582C11.6897 14.0067 11.8267 14.0902 11.9387 14.202L17.3447 19.549C18.4823 18.09 19.0438 16.2637 18.9225 14.4177C18.8011 12.5716 18.0054 10.8345 16.6867 9.53697C16.5927 9.44397 16.518 9.33325 16.4671 9.2112C16.4161 9.08916 16.3899 8.95822 16.3899 8.82597C16.3899 8.69372 16.4161 8.56278 16.4671 8.44074C16.518 8.31869 16.5927 8.20797 16.6867 8.11497L20.4717 4.37097C19.8382 4.04756 19.119 3.93148 18.416 4.03915C17.7129 4.14682 17.0614 4.47279 16.5537 4.97097L12.7007 8.77597C12.5668 8.90916 12.3979 9.00171 12.2136 9.0429C12.0293 9.08409 11.8371 9.07225 11.6592 9.00875C11.4814 8.94524 11.3251 8.83266 11.2086 8.68404C11.092 8.53543 11.02 8.35685 11.0007 8.16897C10.9822 7.98267 11.0138 7.79481 11.0922 7.6248C11.1706 7.4548 11.293 7.30882 11.4467 7.20197L15.1437 3.54997C16.153 2.56145 17.5095 2.00781 18.9222 2.00781C20.3349 2.00781 21.6914 2.56145 22.7007 3.54997Z"/>
    </svg>
  )
}

function RocketIcon() {
  return (
    <svg width="30" height="30" viewBox="0 0 24 24" fill="white" className="shrink-0">
      <path d="M4.00532 16.095C3.24535 16.8896 2.75241 17.9017 2.59532 18.99C2.49962 19.5344 2.46441 20.0878 2.49032 20.64V21.51H3.69032C4.13298 21.5086 4.57467 21.4685 5.01032 21.39C6.10041 21.2388 7.11422 20.745 7.90532 19.98C8.36943 19.4582 8.6079 18.7738 8.56854 18.0766C8.52918 17.3794 8.2152 16.7262 7.69532 16.26C7.224 15.7554 6.57376 15.4555 5.88398 15.4247C5.1942 15.3939 4.51979 15.6345 4.00532 16.095ZM6.61532 18.69C6.09604 19.1818 5.43449 19.4969 4.72532 19.59H4.39532V19.26C4.48842 18.5508 4.80345 17.8893 5.29532 17.37C5.39685 17.2877 5.52476 17.2451 5.65532 17.25C5.78887 17.2553 5.92001 17.2873 6.04107 17.3439C6.16212 17.4006 6.27066 17.4809 6.36032 17.58C6.54036 17.6942 6.66811 17.8748 6.71584 18.0826C6.76358 18.2904 6.72746 18.5086 6.61532 18.69ZM21.9753 3.35998C21.9677 3.00831 21.8246 2.67318 21.5758 2.42445C21.3271 2.17573 20.992 2.03262 20.6403 2.02498C18.8843 1.8816 17.1173 2.09325 15.4448 2.64732C13.7723 3.20139 12.2285 4.08653 10.9053 5.24998L8.46032 8.09998L4.86032 7.34998C4.61478 7.29648 4.35974 7.30554 4.11862 7.3763C3.87749 7.44707 3.65801 7.57728 3.48032 7.75498L2.46032 8.77498C2.30464 8.93371 2.1862 9.12507 2.11356 9.3352C2.04092 9.54533 2.01591 9.76899 2.04032 9.98998C2.06243 10.2138 2.13458 10.4297 2.25142 10.6218C2.36826 10.814 2.5268 10.9774 2.71532 11.1L5.80532 13.08L6.00032 13.2L10.8003 18.075L10.9203 18.195L12.9003 21.285C13.0229 21.4735 13.1863 21.632 13.3785 21.7489C13.5706 21.8657 13.7865 21.9379 14.0103 21.96H14.1753C14.5688 21.9583 14.9459 21.8021 15.2253 21.525L16.2453 20.505C16.423 20.3273 16.5532 20.1078 16.624 19.8667C16.6948 19.6256 16.7038 19.3705 16.6503 19.125L15.9003 15.54L18.6603 13.17C19.8463 11.8432 20.7514 10.29 21.3212 8.60403C21.8909 6.91807 22.1134 5.13423 21.9753 3.35998ZM4.66532 9.22498L6.64532 9.64498L5.68532 10.77L4.18532 9.76498L4.66532 9.22498ZM14.2353 19.875L13.2303 18.375L14.3553 17.415L14.7753 19.395L14.2353 19.875ZM17.4003 11.79L11.8803 16.5L7.50032 12.12L12.2103 6.59998C14.3926 4.71425 17.2202 3.74663 20.1003 3.89998C20.2474 6.77918 19.2806 9.60453 17.4003 11.79Z"/>
      <path d="M16.6953 9.94466C16.8592 9.77255 16.9871 9.56944 17.0715 9.34724C17.1558 9.12505 17.195 8.88825 17.1866 8.65073C17.1782 8.41321 17.1225 8.17976 17.0226 7.96407C16.9228 7.74837 16.781 7.55479 16.6053 7.39466C16.4503 7.21082 16.2589 7.06111 16.0431 6.95499C15.8273 6.84886 15.5918 6.78861 15.3516 6.77805C15.1113 6.76748 14.8715 6.80683 14.6472 6.89362C14.423 6.9804 14.2191 7.11272 14.0486 7.28224C13.878 7.45177 13.7444 7.6548 13.6563 7.87854C13.5681 8.10228 13.5273 8.34186 13.5364 8.58216C13.5455 8.82247 13.6043 9.05828 13.7091 9.27471C13.8139 9.49115 13.9624 9.68351 14.1453 9.83966C14.3055 10.0145 14.4987 10.156 14.7138 10.256C14.9288 10.356 15.1615 10.4125 15.3985 10.4222C15.6355 10.432 15.872 10.3948 16.0946 10.3109C16.3171 10.2309 16.5213 10.1058 16.6953 9.94466Z"/>
    </svg>
  )
}