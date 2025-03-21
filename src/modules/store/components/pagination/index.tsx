"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { 
  Pagination as UIPagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from "@/components/ui/pagination"

export function Pagination({
  page,
  totalPages,
  'data-testid': dataTestid
}: {
  page: number
  totalPages: number
  'data-testid'?: string
}) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // Helper function to generate an array of numbers within a range
  const arrayRange = (start: number, stop: number) =>
    Array.from({ length: stop - start + 1 }, (_, index) => start + index)

  // Function to handle page changes
  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams)
    params.set("page", newPage.toString())
    router.push(`${pathname}?${params.toString()}`)
  }

  // Function to render a page button
  const renderPageButton = (
    p: number,
    label: string | number,
    isCurrent: boolean
  ) => (
    <PaginationItem key={p}>
      <PaginationLink
        href="#"
        isActive={isCurrent}
        onClick={(e) => {
          e.preventDefault()
          handlePageChange(p)
        }}
      >
        {label}
      </PaginationLink>
    </PaginationItem>
  )

  // Function to render ellipsis
  const renderEllipsis = (key: string) => (
    <PaginationItem key={key}>
      <span
        className="flex h-9 w-9 items-center justify-center text-sm font-medium"
      >
        ...
      </span>
    </PaginationItem>
  )

  // Function to render page buttons based on the current page and total pages
  const renderPageButtons = () => {
    const buttons = []

    if (totalPages <= 7) {
      // Show all pages
      buttons.push(
        ...arrayRange(1, totalPages).map((p) =>
          renderPageButton(p, p, p === page)
        )
      )
    } else {
      // Handle different cases for displaying pages and ellipses
      if (page <= 4) {
        // Show 1, 2, 3, 4, 5, ..., lastpage
        buttons.push(
          ...arrayRange(1, 5).map((p) => renderPageButton(p, p, p === page))
        )
        buttons.push(renderEllipsis("ellipsis1"))
        buttons.push(
          renderPageButton(totalPages, totalPages, totalPages === page)
        )
      } else if (page >= totalPages - 3) {
        // Show 1, ..., lastpage - 4, lastpage - 3, lastpage - 2, lastpage - 1, lastpage
        buttons.push(renderPageButton(1, 1, 1 === page))
        buttons.push(renderEllipsis("ellipsis2"))
        buttons.push(
          ...arrayRange(totalPages - 4, totalPages).map((p) =>
            renderPageButton(p, p, p === page)
          )
        )
      } else {
        // Show 1, ..., page - 1, page, page + 1, ..., lastpage
        buttons.push(renderPageButton(1, 1, 1 === page))
        buttons.push(renderEllipsis("ellipsis3"))
        buttons.push(
          ...arrayRange(page - 1, page + 1).map((p) =>
            renderPageButton(p, p, p === page)
          )
        )
        buttons.push(renderEllipsis("ellipsis4"))
        buttons.push(
          renderPageButton(totalPages, totalPages, totalPages === page)
        )
      }
    }

    return buttons
  }

  // Render the component
  return (
    <div className="flex justify-center w-full mt-12">
      <UIPagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              text="Geri"
              onClick={(e) => {
                e.preventDefault()
                if (page > 1) handlePageChange(page - 1)
              }}
            />
          </PaginationItem>
          {renderPageButtons()}
          <PaginationItem>
            <PaginationNext
              href="#"
              text="İleri"
              onClick={(e) => {
                e.preventDefault()
                if (page < totalPages) handlePageChange(page + 1)
              }}
            />
          </PaginationItem>
        </PaginationContent>
      </UIPagination>
    </div>
  )
}
