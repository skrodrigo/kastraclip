"use client"

import { useMemo, useState } from "react"
import { IconDots, IconEdit, IconTrash } from "@tabler/icons-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { sampleProjects } from "@/lib/sample-projects"

export default function ProjectsPage() {
  const [query, setQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string | null>(null)

  const filteredProjects = useMemo(() => {
    return sampleProjects.filter((project) => {
      const matchesQuery = project.title.toLowerCase().includes(query.toLowerCase())
      const matchesStatus = statusFilter ? project.status === statusFilter : true
      return matchesQuery && matchesStatus
    })
  }, [query, statusFilter])

  return (
    <section className="flex flex-col gap-6 p-10">

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {filteredProjects.map((project) => (
          <article
            key={project.id}
            className="group relative rounded-2xl border bg-card overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            onMouseLeave={() => { }}
          >
            <div className="relative h-40 overflow-hidden">
              <div className="absolute inset-0 bg-black/20" />
              <div className="absolute inset-0 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity bg-black/40">
                <Button size="sm" className="rounded-full">
                  View all clips
                </Button>
              </div>
            </div>

            <div className="p-5">
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold">{project.title}</h2>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button className="p-1 rounded-lg hover:bg-muted opacity-0 group-hover:opacity-100 transition-all pointer-events-auto">
                          <IconDots className="h-4 w-4 text-muted-foreground" />
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="pointer-events-auto">
                        <DropdownMenuItem>
                          <IconEdit className="mr-2 h-4 w-4" />
                          Rename
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive focus:text-destructive">
                          <IconTrash className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">{project.description}</p>
                </div>
              </div>

              <div className="mt-3 space-y-1 text-xs text-muted-foreground">
                <div>{project.lastUpdated}</div>
                <div>{project.description}</div>
                <div className="text-orange-600">Expires in 3 days</div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
