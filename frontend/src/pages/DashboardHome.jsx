// import { useProfile } from '../hooks/useProfile';
// import { useProjects } from '../hooks/useProjects';
// import { useSkills } from '../hooks/useSkills';
// import { useBlogPosts } from '../hooks/useBlogPosts';
// import {Link} from 'react-router-dom'

// const DashboardHome = () => {

//     const {data : profile , isLoading :profileLoading } = useProfile();
//     const {data:skills, isLoading:skillsLoading} = useSkills();
//     const {data:projects , isLoading : projectsLoading} = useProjects();
//     const {data : posts , isLoading : postsLoading} = useBlogPosts(); 

//     if(profileLoading) return <div>Loading....</div>

//     return (
//         <div>
//             <h1 className='text-3xl font-bold mb-6 '>Welcome, {profile?.full_name || 'Developer'}!</h1>
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//                 <StarCard title= 'Projects' count={projects?.length || 0} link = "/dashboard/projects"/>
//                 <StarCard title ='Skills' count = {skills?.length || 0} link='/dashboard/skills'/>
//                 <StarCard title ='Blog Posts' count={posts?.length || 0} link='/dashboard/blogpost'/>
//                 <StarCard title = 'Profile' status={profile ? "Complete" : 'Incomplete'} link = '/dashboard/profile'/>
//             </div>
//         </div>
//     )
// }

// const StarCard = ({title,status,count,link}) =>(
// <Link to={link} className='bg-white p-5 rounded shadow hover:shadow-lg transition'>

// <h2 className='text-lg  text-gray-500'>{title}</h2>
// <p className='text-3xl font-semibold'>{count || status}</p>
// </Link>
// ) 


// export default DashboardHome;


import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useProfile } from '../hooks/useProfile';
import { useProjects } from '../hooks/useProjects';
import { useSkills } from '../hooks/useSkills';
import { useBlogPosts } from '../hooks/useBlogPosts';

/* ----------------------------------------------------------------- *
 * Icons — minimal, single-path, inherit color via currentColor
 * ----------------------------------------------------------------- */

const iconProps = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.5,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
};

const IconFolder = (props) => (
  <svg {...iconProps} className={props.className} aria-hidden="true">
    <path d="M3.5 6.5a1 1 0 0 1 1-1h4.5l2 2h8.5a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1h-15a1 1 0 0 1-1-1v-11Z" />
  </svg>
);

const IconSparkle = (props) => (
  <svg {...iconProps} className={props.className} aria-hidden="true">
    <path d="M12 3.5c.5 3 2 4.5 5 5-3 .5-4.5 2-5 5-.5-3-2-4.5-5-5 3-.5 4.5-2 5-5Z" />
    <path d="M18.5 15.5c.25 1.25.9 1.9 2.15 2.15-1.25.25-1.9.9-2.15 2.15-.25-1.25-.9-1.9-2.15-2.15 1.25-.25 1.9-.9 2.15-2.15Z" />
  </svg>
);

const IconFeather = (props) => (
  <svg {...iconProps} className={props.className} aria-hidden="true">
    <path d="M20 4c-6 0-13 3-15 11 0 0 2.5 1 5-1" />
    <path d="M5 20 18.5 6.5" />
    <path d="M9.5 15.5H14v-4.5" />
  </svg>
);

const IconUser = (props) => (
  <svg {...iconProps} className={props.className} aria-hidden="true">
    <circle cx="12" cy="8.5" r="3.25" />
    <path d="M5.5 20c1.2-3.6 4-5.5 6.5-5.5s5.3 1.9 6.5 5.5" />
  </svg>
);

const IconArrowRight = (props) => (
  <svg {...iconProps} className={props.className} aria-hidden="true">
    <path d="M4.5 12h15" />
    <path d="M13.5 6.5 19 12l-5.5 5.5" />
  </svg>
);

/* ----------------------------------------------------------------- *
 * Small utilities
 * ----------------------------------------------------------------- */

function pluralize(count, word) {
  return `${count} ${word}${count === 1 ? '' : 's'}`;
}

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 5) return 'Still up';
  if (hour < 12) return 'Good morning';
  if (hour < 18) return 'Good afternoon';
  return 'Good evening';
}

/** Animates a number from its previous value up to `target` once loading finishes. */
function useCountUp(target, enabled) {
  const [value, setValue] = useState(0);
  const prevTarget = useRef(0);

  useEffect(() => {
    if (!enabled) return;

    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

    if (prefersReduced) {
      setValue(target);
      prevTarget.current = target;
      return;
    }

    const from = prevTarget.current;
    const to = target ?? 0;
    const duration = 700;
    const start = performance.now();
    let frame;

    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(from + (to - from) * eased));
      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      } else {
        prevTarget.current = to;
      }
    }

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target, enabled]);

  return value;
}

/* ----------------------------------------------------------------- *
 * Stat card
 * ----------------------------------------------------------------- */

function StatCard({ to, label, icon, value, loading, meta }) {
  const count = useCountUp(value ?? 0, !loading);

  return (
    <Link
      to={to}
      className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6 backdrop-blur-sm transition-colors duration-300 hover:border-white/[0.15] hover:bg-white/[0.05] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
    >
      <span
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-400/0 to-transparent transition-all duration-300 group-hover:via-amber-400/60"
      />

      <div className="flex items-start justify-between">
        <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] text-amber-300/80">
          <icon.type {...icon.props} className="h-4 w-4" />
        </span>
        <IconArrowRight className="h-4 w-4 -translate-x-1 text-white/20 opacity-0 transition-all duration-300 motion-safe:group-hover:translate-x-0 group-hover:opacity-100 group-hover:text-amber-300/70" />
      </div>

      <div className="mt-6">
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/40">{label}</p>
        {loading ? (
          <div className="mt-2 h-9 w-16 animate-pulse rounded bg-white/10" />
        ) : (
          <p className="mt-1 font-mono text-4xl font-semibold tabular-nums text-white">{count}</p>
        )}
        <p className="mt-1 text-sm text-white/40">{meta}</p>
      </div>
    </Link>
  );
}

/* ----------------------------------------------------------------- *
 * Profile card — status rather than a count
 * ----------------------------------------------------------------- */

function ProfileCard({ to, complete, loading }) {
  return (
    <Link
      to={to}
      className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6 backdrop-blur-sm transition-colors duration-300 hover:border-white/[0.15] hover:bg-white/[0.05] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
    >
      <span
        aria-hidden="true"
        className={`absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent to-transparent transition-all duration-300 ${
          complete ? 'via-emerald-400/0 group-hover:via-emerald-400/60' : 'via-amber-400/0 group-hover:via-amber-400/60'
        }`}
      />

      <div className="flex items-start justify-between">
        <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] text-amber-300/80">
          <IconUser className="h-4 w-4" />
        </span>
        <IconArrowRight className="h-4 w-4 -translate-x-1 text-white/20 opacity-0 transition-all duration-300 motion-safe:group-hover:translate-x-0 group-hover:opacity-100 group-hover:text-amber-300/70" />
      </div>

      <div className="mt-6">
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/40">Profile</p>
        {loading ? (
          <div className="mt-2 h-7 w-24 animate-pulse rounded bg-white/10" />
        ) : (
          <div className="mt-2 flex items-center gap-2">
            <span
              aria-hidden="true"
              className={`h-1.5 w-1.5 rounded-full ${complete ? 'bg-emerald-400' : 'bg-amber-400'}`}
            />
            <p className="font-mono text-xl font-semibold text-white">
              {complete ? 'Complete' : 'Incomplete'}
            </p>
          </div>
        )}
        <p className="mt-1 text-sm text-white/40">
          {complete ? 'All set' : 'Finish setting up your profile'}
        </p>
      </div>
    </Link>
  );
}

/* ----------------------------------------------------------------- *
 * Page
 * ----------------------------------------------------------------- */

const DashboardHome = () => {
  const { data: profile, isLoading: profileLoading } = useProfile();
  const { data: skills, isLoading: skillsLoading } = useSkills();
  const { data: projects, isLoading: projectsLoading } = useProjects();
  const { data: posts, isLoading: postsLoading } = useBlogPosts();

  const greeting = getGreeting();
  const firstName = profile?.full_name?.split(' ')[0] || 'there';

  const summaryLoading = projectsLoading || skillsLoading || postsLoading;
  const summaryText = `${pluralize(projects?.length ?? 0, 'project')} · ${pluralize(
    skills?.length ?? 0,
    'skill'
  )} · ${pluralize(posts?.length ?? 0, 'post')} published`;

  return (
    <div className="relative isolate overflow-hidden rounded-3xl bg-zinc-950 px-6 py-10 sm:px-10 sm:py-14">
      {/* ambient accent glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 right-0 h-[420px] w-[420px] rounded-full bg-amber-500/10 blur-[120px]"
      />
      {/* faint console grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            'linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      <div className="relative">
        {/* Hero */}
        <header className="flex flex-col gap-6 border-b border-white/[0.08] pb-10 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-white/40">
              <span className="relative flex h-1.5 w-1.5" aria-hidden="true">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/60 motion-reduce:animate-none" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
              </span>
              Dashboard · All systems synced
            </div>

            <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              {profileLoading ? (
                <span className="inline-block h-11 w-72 max-w-full animate-pulse rounded-lg bg-white/10 align-middle" />
              ) : (
                <>
                  {greeting}, <span className="text-amber-300">{firstName}</span>
                </>
              )}
            </h1>

            <p className="mt-3 max-w-md text-sm text-white/40">
              {summaryLoading ? (
                <span className="inline-block h-4 w-64 max-w-full animate-pulse rounded bg-white/10" />
              ) : (
                summaryText
              )}
            </p>
          </div>

          <Link
            to="/dashboard/profile"
            className="group inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-white/70 backdrop-blur-sm transition-colors duration-300 hover:border-amber-400/40 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
          >
            Manage profile
            <IconArrowRight className="h-3.5 w-3.5 transition-transform duration-300 motion-safe:group-hover:translate-x-0.5" />
          </Link>
        </header>

        {/* Stats */}
        <section className="mt-10">
          <h2 className="sr-only">Overview</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard
              to="/dashboard/projects"
              label="Projects"
              icon={<IconFolder />}
              value={projects?.length}
              loading={projectsLoading}
              meta="in your portfolio"
            />
            <StatCard
              to="/dashboard/skills"
              label="Skills"
              icon={<IconSparkle />}
              value={skills?.length}
              loading={skillsLoading}
              meta="listed"
            />
            <StatCard
              to="/dashboard/blogpost"
              label="Blog posts"
              icon={<IconFeather />}
              value={posts?.length}
              loading={postsLoading}
              meta="published"
            />
            <ProfileCard to="/dashboard/profile" complete={!!profile} loading={profileLoading} />
          </div>
        </section>
      </div>
    </div>
  );
};

export default DashboardHome;