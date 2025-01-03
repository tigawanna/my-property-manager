
import { createFileRoute } from '@tanstack/react-router'
import { OneShopsbillsPage } from '@/routes/dashboard/bills/shopsbills/-components/oneshopsbills/OneShopsbillsPage'

export const Route = createFileRoute('/dashboard/bills/shopsbills/$shopsbills/')({
  component: OneShopsbillsPage
})

  