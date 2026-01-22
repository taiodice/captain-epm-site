import { getDictionary } from '@/get-dictionary'
import { Locale } from '@/i18n-config'
import LoginForm from './login-form'

export default async function LoginPage({ params }: { params: { lang: Locale } }) {
  const dictionary = await getDictionary(params.lang)

  return <LoginForm dictionary={dictionary} />
}
