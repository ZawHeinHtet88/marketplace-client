'use client'

import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

type PaginationProps = {
  page: number
  totalPages: number
  onPageChange: (page: number) => void
}

function getPaginationRange(page: number, total: number, delta = 1) {
  const range: (number | string)[] = []
  const left = Math.max(2, page - delta)
  const right = Math.min(total - 1, page + delta)

  range.push(1)

  if (left > 2) {
    range.push('...')
  }

  for (let i = left; i <= right; i++) {
    range.push(i)
  }

  if (right < total - 1) {
    range.push('...')
  }

  if (total > 1) {
    range.push(total)
  }

  return range
}

export default function Pagination({ page, totalPages, onPageChange }: PaginationProps) {
  const pages = getPaginationRange(page, totalPages)

  return (
    <div className="flex items-center justify-center gap-2 mt-6 flex-wrap text-primary">
      <Button
        className='text-primary'
        variant="outline"
        size="icon"
        disabled={page === 1}
        onClick={() => onPageChange(page - 1)}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

      {pages.map((p, i) =>
        typeof p === 'number' ? (
          <Button
            key={i}
            variant={p === page ? 'default' : 'outline'}
            size="icon"
            onClick={() => onPageChange(p)}
            className={cn(p === page && 'bg-primary text-primary-foreground')}
          >
            {p}
          </Button>
        ) : (
          <span key={i} className="px-2 text-muted-foreground select-none">
            {p}
          </span>
        )
      )}

      <Button
        className='text-primary'
        variant="outline"
        size="icon"
        disabled={page === totalPages}
        onClick={() => onPageChange(page + 1)}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  )
}
