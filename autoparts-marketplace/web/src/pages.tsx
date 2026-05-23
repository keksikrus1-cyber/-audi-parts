import { Link, Outlet } from '@tanstack/react-router'

import { Header } from '@/components/layout/Header'
import { CartProvider } from '@/components/cart/CartProvider'
import { CartDrawer } from '@/components/cart/CartDrawer'
import { LocalUiProvider } from '@/components/local-ui/LocalUiProvider'
import { CompareBar } from '@/components/compare/CompareBar'
import { CompareModal } from '@/components/compare/CompareModal'
import { HomeHero } from '@/components/home/HomeHero'
import { SearchForm } from '@/components/home/SearchForm'
import { PopularCategories } from '@/components/home/PopularCategories'
import { PriceComparisonTable } from '@/components/home/PriceComparisonTable'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Spinner } from '@/components/ui/spinner'
import { Typography } from '@/components/ui/typography'
import { useAuth } from '@/lib/use-auth'

export function RootLayout() {
  return (
    <LocalUiProvider>
      <CartProvider>
        <main className="ap-page">
          <Header />
          <Outlet />
          <CartDrawer />
          <CompareBar />
          <CompareModal />
        </main>
      </CartProvider>
    </LocalUiProvider>
  )
}

export function HomePage() {
  return (
    <div className="ap-home">
      <HomeHero>
        <SearchForm />
      </HomeHero>
      <PopularCategories />
      <PriceComparisonTable />
    </div>
  )
}

export function ComingSoonPage({ title }: { title: string }) {
  return (
    <div className="ap-coming-soon">
      <div className="ap-coming-soon-icon">🚧</div>
      <h2 className="ap-heading-lg ap-coming-soon-title">{title}</h2>
      <p className="ap-coming-soon-desc">
        Этот раздел находится в разработке и скоро будет доступен.
      </p>
      <a href="/catalog" className="ap-btn ap-btn-primary">Перейти в каталог</a>
    </div>
  )
}

export function AppPage() {
  const auth = useAuth()

  if (auth.isBootstrapping) {
    return <LoadingState />
  }

  if (!auth.user) {
    return (
      <section className="mx-auto grid w-full max-w-6xl gap-6 px-5 py-16">
        <Badge variant="outline" className="w-fit">
          Protected example
        </Badge>
        <div className="grid max-w-3xl gap-4">
          <Typography variant="h1">Login required</Typography>
          <Typography className="max-w-2xl" tone="muted">
            This route intentionally stays small and shows where protected product UI begins.
          </Typography>
        </div>
        <Button asChild size="lg" className="w-fit">
          <Link to="/">Go to auth</Link>
        </Button>
      </section>
    )
  }

  return (
    <section className="mx-auto grid w-full max-w-6xl gap-6 px-5 py-12">
      <div className="grid gap-3">
        <Badge variant="outline" className="w-fit">
          Current user
        </Badge>
        <Typography variant="h1">
          {auth.user.displayName ?? auth.user.email}
        </Typography>
        <Typography tone="muted">{auth.user.email}</Typography>
      </div>

      <Separator />

      <div className="grid gap-4 sm:grid-cols-2">
        <Card size="sm">
          <CardHeader>
            <CardTitle>User ID</CardTitle>
            <CardDescription wrap="break">{auth.user.id}</CardDescription>
          </CardHeader>
        </Card>
        <Card size="sm">
          <CardHeader>
            <CardTitle>Created</CardTitle>
            <CardDescription>{new Date(auth.user.createdAt).toLocaleString()}</CardDescription>
          </CardHeader>
        </Card>
      </div>
    </section>
  )
}

function LoadingState() {
  return (
    <section className="mx-auto w-full max-w-6xl px-5 py-16">
      <Card className="w-fit">
        <CardContent className="flex items-center gap-3">
          <Spinner />
          <Typography variant="bodySm" tone="muted">
            Checking session...
          </Typography>
        </CardContent>
      </Card>
    </section>
  )
}
