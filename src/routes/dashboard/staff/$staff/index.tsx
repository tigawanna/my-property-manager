import { createFileRoute } from '@tanstack/react-router'
import { OneStaffPage } from '../-components/onestaff/OneStaffPage'

export const Route = createFileRoute('/dashboard/staff/$staff/')({
  component: OneStaffPage
})
