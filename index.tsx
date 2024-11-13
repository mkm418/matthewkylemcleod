"use client"

import { useState, useEffect } from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { Search, ChevronLeft, MoreVertical, Music, Headphones, Radio, Mic, Zap, Heart, Star, Flame } from "lucide-react"

type Page = "about" | "quick-links" | "principles" | "bookmarks" | "fav-spots" | "fav-products" | "on-repeat" | "reading-list"

export default function Component() {
  const [activePage, setActivePage] = useState<Page>("on-repeat")
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="grid h-screen grid-cols-[280px_1fr] bg-zinc-900 text-zinc-200">
      {/* Sidebar */}
      <div className="border-r border-zinc-800">
        <div className="flex h-full flex-col">
          <div className="p-4">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-zinc-500" />
              <Input
                className="w-full bg-zinc-800 pl-8 text-sm text-zinc-200 placeholder:text-zinc-500"
                placeholder="Search"
              />
            </div>
          </div>
          <ScrollArea className="flex-1 px-4">
            <div className="space-y-1">
              <h2 className="px-2 text-lg font-semibold">Notes</h2>
              <div className="space-y-1">
                <SidebarItem
                  icon="📍"
                  title="about me"
                  lastUpdated={new Date("2024-07-03T10:30:00")}
                  preview="my name is alana (rhym..."
                  active={activePage === "about"}
                  onClick={() => setActivePage("about")}
                />
                <SidebarItem
                  icon="🔗"
                  title="quick links"
                  lastUpdated={new Date("2024-07-02T14:45:00")}
                  preview="email inbox zero, i respo..."
                  active={activePage === "quick-links"}
                  onClick={() => setActivePage("quick-links")}
                />
                <SidebarItem
                  icon="📌"
                  title="principles"
                  lastUpdated={new Date("2024-07-01T09:15:00")}
                  preview="act with urgency do what..."
                  active={activePage === "principles"}
                  onClick={() => setActivePage("principles")}
                />
                <SidebarItem
                  icon="💎"
                  title="bookmarks"
                  lastUpdated={new Date("2024-06-30T16:20:00")}
                  preview="intensity is the price o..."
                  active={activePage === "bookmarks"}
                  onClick={() => setActivePage("bookmarks")}
                />
                <SidebarItem
                  icon="🏖"
                  title="fav spots"
                  lastUpdated={new Date("2024-06-28T11:05:00")}
                  preview="sf akikos sorrel kokkari..."
                  active={activePage === "fav-spots"}
                  onClick={() => setActivePage("fav-spots")}
                />
                <SidebarItem
                  icon="👥"
                  title="fav products"
                  lastUpdated={new Date("2024-06-24T13:40:00")}
                  preview="development stack sup..."
                  active={activePage === "fav-products"}
                  onClick={() => setActivePage("fav-products")}
                />
                <SidebarItem
                  icon="🎵"
                  title="on repeat"
                  lastUpdated={new Date("2024-06-20T18:55:00")}
                  preview="edm/house childish lan..."
                  active={activePage === "on-repeat"}
                  onClick={() => setActivePage("on-repeat")}
                />
                <SidebarItem
                  icon="📚"
                  title="reading list"
                  lastUpdated={new Date("2024-06-14T08:10:00")}
                  preview="currently reading softw..."
                  active={activePage === "reading-list"}
                  onClick={() => setActivePage("reading-list")}
                />
              </div>
            </div>
          </ScrollArea>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col">
        <div className="flex items-center justify-between border-b border-zinc-800 px-8 py-2">
          <div className="text-sm text-zinc-400">
            {currentTime.toLocaleString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric', 
              hour: 'numeric', 
              minute: 'numeric', 
              hour12: true 
            })}
          </div>
          <div className="text-sm text-zinc-400">
            Last updated: {getLastUpdatedTime(activePage)}
          </div>
        </div>
        <ScrollArea className="flex-1">
          <div className="p-8">
            {activePage === "about" && <AboutContent />}
            {activePage === "quick-links" && <QuickLinksContent />}
            {activePage === "principles" && <PrinciplesContent />}
            {activePage === "bookmarks" && <BookmarksContent />}
            {activePage === "fav-spots" && <FavSpotsContent />}
            {activePage === "fav-products" && <FavProductsContent />}
            {activePage === "on-repeat" && <OnRepeatContent />}
            {activePage === "reading-list" && <ReadingListContent />}
          </div>
        </ScrollArea>
      </div>
    </div>
  )
}

function SidebarItem({
  icon,
  title,
  lastUpdated,
  preview,
  active = false,
  onClick,
}: {
  icon: string
  title: string
  lastUpdated: Date
  preview: string
  active?: boolean
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full rounded-lg px-2 py-1.5 text-left transition-colors ${
        active ? "bg-amber-500/20" : "hover:bg-zinc-800"
      }`}
    >
      <div className="flex items-center gap-2">
        <span>{icon}</span>
        <span className="text-sm font-medium">{title}</span>
      </div>
      <div className="mt-0.5 text-xs text-zinc-500">
        {lastUpdated.toLocaleString('en-US', { 
          month: 'numeric', 
          day: 'numeric', 
          year: 'numeric', 
          hour: 'numeric', 
          minute: 'numeric', 
          hour12: true 
        })}
      </div>
      <div className="mt-0.5 text-xs text-zinc-400">{preview}</div>
    </button>
  )
}

function OnRepeatContent() {
  const songs = [
    { title: "Numb Little Bug", artist: "Em Beihold", icon: <Zap className="h-5 w-5 text-amber-500" /> },
    { title: "As It Was", artist: "Harry Styles", icon: <Star className="h-5 w-5 text-amber-500" /> },
    { title: "About Damn Time", artist: "Lizzo", icon: <Flame className="h-5 w-5 text-amber-500" /> },
    { title: "Anti-Hero", artist: "Taylor Swift", icon: <Heart className="h-5 w-5 text-amber-500" /> },
    { title: "Heat Waves", artist: "Glass Animals", icon: <Radio className="h-5 w-5 text-amber-500" /> },
    { title: "Shivers", artist: "Ed Sheeran", icon: <Music className="h-5 w-5 text-amber-500" /> },
    { title: "Stay", artist: "The Kid LAROI & Justin Bieber", icon: <Mic className="h-5 w-5 text-amber-500" /> },
    { title: "Enemy", artist: "Imagine Dragons & JID", icon: <Headphones className="h-5 w-5 text-amber-500" /> },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <span className="text-xl">🎵</span>
        <h1 className="text-xl font-medium">on repeat</h1>
      </div>
      <div className="rounded-lg bg-zinc-800 p-4">
        <ul className="space-y-4">
          {songs.map((song, index) => (
            <li key={index} className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-700">
                {song.icon}
              </div>
              <div>
                <p className="font-medium text-amber-500">{song.title}</p>
                <p className="text-sm text-zinc-400">{song.artist}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

function AboutContent() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <span className="text-xl">📍</span>
        <h1 className="text-xl font-medium">about me</h1>
      </div>
      <p className="text-zinc-400">my name is alana (rhymes with "banana")</p>
      <div>
        <h2 className="mb-2 text-lg font-medium">currently</h2>
        <ul className="list-disc space-y-2 pl-5 text-zinc-400">
          <li>
            founder & managing partner of{" "}
            <Link href="#" className="text-amber-500 hover:underline">
              basecase capital
            </Link>
          </li>
          <li>
            partner to a number of incredible companies, including{" "}
            <span className="text-amber-500">
              ashby, astral, baseten, braintrust, browserbase, default, graphite, orb, resend, supabase, vercel
            </span>
            , & others
          </li>
          <li>
            builder & maintainer of a few open-source projects, including{" "}
            <span className="text-amber-500">briefcase, branded, eventbase, docbase</span>, & others
          </li>
          <li>
            wife & partner in crime to{" "}
            <Link href="#" className="text-amber-500 hover:underline">
              ankur goyal
            </Link>
          </li>
        </ul>
      </div>
    </div>
  )
}

function QuickLinksContent() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <span className="text-xl">🔗</span>
        <h1 className="text-xl font-medium">quick links</h1>
      </div>
      <ul className="space-y-2 text-zinc-400">
        <li>
          <Link href="#" className="text-amber-500 hover:underline">email</Link> - inbox zero, i respond to every email
        </li>
        <li>
          <Link href="#" className="text-amber-500 hover:underline">twitter</Link> - sporadic thoughts, responsive to dms
        </li>
        <li>
          <Link href="#" className="text-amber-500 hover:underline">github</Link> - so many green squares, hit me with a pull request
        </li>
        <li>
          <Link href="#" className="text-amber-500 hover:underline">linkedin</Link> - mostly for stalking people, i don't check dms
        </li>
        <li>
          <Link href="#" className="text-amber-500 hover:underline">instagram</Link> - quarterly photo dumps, i don't check dms
        </li>
      </ul>
    </div>
  )
}

function PrinciplesContent() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <span className="text-xl">📌</span>
        <h1 className="text-xl font-medium">principles</h1>
      </div>
      <ul className="space-y-2 text-zinc-400">
        <li>act with urgency</li>
        <li>do what you say you're going to do</li>
        <li>be kind</li>
        <li>be curious</li>
        <li>be humble</li>
        <li>be grateful</li>
        <li>be passionate</li>
        <li>be persistent</li>
      </ul>
    </div>
  )
}

function BookmarksContent() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <span className="text-xl">💎</span>
        <h1 className="text-xl font-medium">bookmarks</h1>
      </div>
      <ul className="space-y-2 text-zinc-400">
        <li>"intensity is the price of excellence" - warren buffett</li>
        <li>
          "sometimes magic is just someone spending more time on something than anyone else might reasonably expect" - will guidara,{" "}
          <Link href="#" className="text-amber-500 hover:underline">unreasonable hospitality</Link>
        </li>
        <li>
          "anyone can get a first meeting" - michael ovitz,{" "}
          <Link href="#" className="text-amber-500 hover:underline">who is michael ovitz</Link>
        </li>
        <li>
          "happiness is not a tangible thing, it's a byproduct of achievement" - ray kroc,{" "}
          <Link href="#" className="text-amber-500 hover:underline">grinding it out</Link>
        </li>
        <li>
          "there's aesthetic value in doing things the right way" - danny meyer,{" "}
          <Link href="#" className="text-amber-500 hover:underline">setting the table</Link>
        </li>
      </ul>
    </div>
  )
}

function FavSpotsContent() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <span className="text-xl">🏖</span>
        <h1 className="text-xl font-medium">fav spots</h1>
      </div>
      <ul className="space-y-2 text-zinc-400">
        <li>SF: Akiko's, Sorrel, Kokkari, Nopa, Che Fico</li>
        <li>NYC: Carbone, Lilia, Russ & Daughters, Joe's Pizza</li>
        <li>LA: Nobu Malibu, Felix, Jon & Vinny's</li>
        <li>London: Dishoom, Padella, Flat Iron</li>
        <li>Tokyo: Sushi Saito, Narisawa, Den</li>
      </ul>
    </div>
  )
}

function FavProductsContent() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <span className="text-xl">👥</span>
        <h1 className="text-xl font-medium">fav products</h1>
      </div>
      <div>
        <h2 className="mb-2 text-lg font-medium">development stack</h2>
        <ul className="space-y-2 text-zinc-400">
          <li>
            <Link href="#" className="text-amber-500 hover:underline">supabase</Link> - let's not pretend we're rolling our own postgres over here
          </li>
          <li>
            <Link href="#" className="text-amber-500 hover:underline">next.js</Link> - the only app framework you need
          </li>
          <li>
            <Link href="#" className="text-amber-500 hover:underline">vercel</Link> - have literally never hosted a project elsewhere
          </li>
          <li>
            <Link href="#" className="text-amber-500 hover:underline">shadcn/ui</Link> - simply could not build an app without these ui components
          </li>
          <li>
            <Link href="#" className="text-amber-500 hover:underline">resend</Link> - dead simple email api
          </li>
        </ul>
      </div>
    </div>
  )
}

function ReadingListContent() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <span className="text-xl">📚</span>
        <h1 className="text-xl font-medium">reading list</h1>
      </div>
      <div className="space-y-4">
        <section>
          <h2 className="mb-2 text-sm font-medium">currently reading</h2>
          <div className="space-y-2">
            <ReadingItem
              title="softwar: an intimate portrait of larry ellison and oracle"
              authors="matthew symonds, larry ellison"
              checked={false}
            />
          </div>
        </section>
        <section>
          <h2 className="mb-2 text-sm font-medium">so far this year</h2>
          <div className="space-y-2">
            <ReadingItem
              title="the formula: how rogues, geniuses, and speed freaks reengineered f1 into the world's fastest-growing sport"
              authors="joshua robinson, jonathan clegg"
              checked={true}
            />
            <ReadingItem
              title="sam walton: made in america"
              authors="sam walton"
              checked={true}
            />
            <ReadingItem
              title="becoming trader joe"
              authors="joe coulombe"
              checked={true}
            />
            <ReadingItem
              title="hard times"
              authors="charles dickens"
              checked={true}
            />
            <ReadingItem
              title="a history of the world in six glasses"
              authors="tom standage"
              checked={true}
            />
          </div>
        </section>
      </div>
    </div>
  )
}

function ReadingItem({ title, authors, checked }: { title: string; authors: string; checked: boolean }) {
  return (
    <div className="flex items-start space-x-2">
      <div className={`mt-1 h-4 w-4 flex-shrink-0 rounded-full border ${checked ? 'bg-amber-500 border-amber-500' : 'border-zinc-600'}`}>
        {checked && (
          <svg className="h-4 w-4 text-zinc-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        )}
      </div>
      <div>
        <p className="font-medium leading-tight text-amber-500">{title}</p>
        <p className="text-sm text-zinc-400">by {authors}</p>
      </div>
    </div>
  )
}

function getLastUpdatedTime(page: Page): string {
  const pageData = {
    "about": new Date("2024-07-03T10:30:00"),
    "quick-links": new Date("2024-07-02T14:45:00"),
    "principles": new Date("2024-07-01T09:15:00"),
    "bookmarks": new Date("2024-06-30T16:20:00"),
    "fav-spots": new Date("2024-06-28T11:05:00"),
    "fav-products": new Date("2024-06-24T13:40:00"),
    "on-repeat": new Date("2024-06-20T18:55:00"),
    "reading-list": new Date("2024-06-14T08:10:00")
  }
  
  return pageData[page].toLocaleString('en-US', { 
    month: 'long', 
    day: 'numeric', 
    year: 'numeric', 
    hour: 'numeric', 
    minute: 'numeric', 
    hour12: true 
  })
}