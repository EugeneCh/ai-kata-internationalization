import { useTranslation } from 'react-i18next'
import type { Destination, TravelPace } from '../data/destinations'
import type { FaqItem } from '../data/faqs'

export type OptionItem = {
  value: string
  label: string
}

export type ContentCard = {
  title: string
  text: string
}

export type CityTip = {
  city: string
  tip: string
}

export type PolicyItem = {
  heading: string
  body: string
}

export function useLocalizedContent() {
  const { t } = useTranslation()

  return {
    destinations: t('destinations.items', { returnObjects: true }) as Destination[],
    faqs: t('faq.items', { returnObjects: true }) as FaqItem[],
    homeSteps: t('home.howItWorks.steps', { returnObjects: true }) as ContentCard[],
    guideNotes: t('guides.planningNotes', { returnObjects: true }) as ContentCard[],
    cityTips: t('guides.cityTips', { returnObjects: true }) as CityTip[],
    guideQuestions: t('guides.questions', { returnObjects: true }) as ContentCard[],
    quickStartSteps: t('help.quickStartSteps', { returnObjects: true }) as ContentCard[],
    supportTopics: t('help.supportTopics', { returnObjects: true }) as string[],
    bookingTerms: t('help.bookingTerms', { returnObjects: true }) as PolicyItem[],
    privacyParagraphs: t('help.privacy', { returnObjects: true }) as string[],
    contactParagraphs: t('help.contact', { returnObjects: true }) as string[],
    months: t('common.months', { returnObjects: true }) as OptionItem[],
    stayLengths: t('common.stayLengths', { returnObjects: true }) as OptionItem[],
    getPaceLabel: (pace: 'any' | TravelPace) => t(`common.pace.${pace}`),
    getPaceBadgeLabel: (pace: TravelPace) => t(`common.paceBadge.${pace}`),
  }
}
