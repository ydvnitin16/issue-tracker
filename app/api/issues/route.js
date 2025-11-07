import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export let issues = [
  {
    id: 1,
    title: "Initialize Next.js project setup",
    description: `
**Goal:** Setup the base structure using Next.js App Router with Tailwind CSS and ESLint.  
**Tasks:**  
- Initialize Next.js app  
- Setup Tailwind & global styles  
- Create folders: \`app/\`, \`components/\`, \`lib/\`
    `,
    status: "closed",
    created: new Date("November 7, 2025 10:00:00"),
  },
  {
    id: 2,
    title: "Setup Prisma and database connection",
    description: `
**Goal:** Integrate Prisma ORM with PostgreSQL or SQLite.  
**Tasks:**  
- Install Prisma and initialize  
- Add \`.env\` with \`DATABASE_URL\`  
- Test connection with \`npx prisma db push\`
    `,
    status: "closed",
    created: new Date("November 7, 2025 10:10:00"),
  },
  {
    id: 3,
    title: "Create Prisma schema for Issue model",
    description: `
**Goal:** Define database structure for issues.  
**Schema:**  
\`\`\`prisma
model Issue {
  id          Int      @id @default(autoincrement())
  title       String
  description String
  status      String
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
\`\`\`
Run migrations after schema creation.
    `,
    status: "closed",
    created: new Date("November 7, 2025 10:20:00"),
  },
  {
    id: 4,
    title: "Seed database with sample issues",
    description: `
**Goal:** Populate initial issues for development.  
**Tasks:**  
- Create a \`prisma/seed.js\` file  
- Insert a few demo issues for display and testing
    `,
    status: "closed",
    created: new Date("November 7, 2025 10:25:00"),
  },
  {
    id: 5,
    title: "Setup Next.js API routes for issues",
    description: `
**Goal:** Create RESTful API endpoints.  
**Endpoints:**  
- \`GET /api/issues\` → Fetch all issues  
- \`POST /api/issues\` → Create new issue  
- \`GET /api/issues/[id]\` → Fetch single issue  
- \`PATCH /api/issues/[id]\` → Update issue  
- \`DELETE /api/issues/[id]\` → Remove issue
    `,
    status: "closed",
    created: new Date("November 7, 2025 10:30:00"),
  },
  {
    id: 6,
    title: "Fetch issues from API in IssueList page",
    description: `
**Goal:** Display all issues dynamically.  
**Tasks:**  
- Fetch issues from API  
- Render using a server component  
- Style with Tailwind table layout
    `,
    status: "closed",
    created: new Date("November 7, 2025 10:40:00"),
  },
  {
    id: 7,
    title: "Add issue detail page with dynamic routing",
    description: `
**Goal:** Build detailed issue view page.  
**Tasks:**  
- Create route \`/issues/[id]\`  
- Fetch issue by ID using server component  
- Display issue title, status, and description  
- Add placeholder for editing or deleting
    `,
    status: "closed",
    created: new Date("November 7, 2025 10:50:00"),
  },
  {
    id: 8,
    title: "Add new issue creation form",
    description: `
**Goal:** Allow users to add new issues via UI.  
**Tasks:**  
- Use Radix UI Dialog for modal form  
- Add form validation (title, description required)  
- POST data to \`/api/issues\`  
- Show success or error feedback
    `,
    status: "closed",
    created: new Date("November 7, 2025 11:00:00"),
  },
  {
    id: 9,
    title: "Implement issue status update feature",
    description: `
**Goal:** Let users change issue status.  
**Tasks:**  
- Add dropdown with statuses: \`open\`, \`in progress\`, \`closed\`  
- Use PATCH request to update status  
- Show status badges in UI
    `,
    status: "in progress",
    created: new Date("November 7, 2025 11:10:00"),
  },
  {
    id: 10,
    title: "Add issue delete functionality",
    description: `
**Goal:** Allow issue removal.  
**Tasks:**  
- Add delete button with confirmation dialog  
- Integrate DELETE API  
- Refresh list after delete
    `,
    status: "open",
    created: new Date("November 7, 2025 11:15:00"),
  },
  {
    id: 11,
    title: "Implement filtering and sorting",
    description: `
**Goal:** Enable better issue management.  
**Tasks:**  
- Filter issues by status  
- Sort by created date or title  
- Handle via query params in API
    `,
    status: "open",
    created: new Date("November 7, 2025 11:25:00"),
  },
  {
    id: 12,
    title: "Add search functionality",
    description: `
**Goal:** Implement client-side search.  
**Tasks:**  
- Add search input in dashboard  
- Filter issues by title as user types  
- Debounce input for better performance
    `,
    status: "open",
    created: new Date("November 7, 2025 11:30:00"),
  },
  {
    id: 13,
    title: "Implement pagination in issue list",
    description: `
**Goal:** Optimize dashboard performance.  
**Tasks:**  
- Fetch issues with \`?page=\` and \`?limit=\` query  
- Add pagination controls below table
    `,
    status: "open",
    created: new Date("November 7, 2025 11:40:00"),
  },
  {
    id: 14,
    title: "Add authentication (NextAuth.js)",
    description: `
**Goal:** Secure app with authentication.  
**Tasks:**  
- Integrate NextAuth.js  
- Add Google/GitHub provider  
- Protect API routes and pages
    `,
    status: "open",
    created: new Date("November 7, 2025 11:45:00"),
  },
  {
    id: 15,
    title: "Protect routes with middleware",
    description: `
**Goal:** Restrict unauthenticated access.  
**Tasks:**  
- Add Next.js middleware to check session  
- Redirect unauthenticated users to login
    `,
    status: "open",
    created: new Date("November 7, 2025 11:50:00"),
  },
  {
    id: 16,
    title: "Add role-based access control",
    description: `
**Goal:** Differentiate user permissions.  
**Tasks:**  
- Add \`role\` field in User model  
- Allow only admins to delete/edit  
- Show limited actions for normal users
    `,
    status: "open",
    created: new Date("November 7, 2025 11:55:00"),
  },
  {
    id: 17,
    title: "Add dark mode support",
    description: `
**Goal:** Implement UI theme toggle.  
**Tasks:**  
- Use \`next-themes\` package  
- Add theme switch in navbar  
- Persist preference in localStorage
    `,
    status: "open",
    created: new Date("November 7, 2025 12:00:00"),
  },
  {
    id: 18,
    title: "Add error boundary and loading states",
    description: `
**Goal:** Handle data loading and errors gracefully.  
**Tasks:**  
- Add \`loading.js\` and \`error.js\` files  
- Show skeleton or spinner during fetch  
- Display friendly error messages
    `,
    status: "open",
    created: new Date("November 7, 2025 12:10:00"),
  },
  {
    id: 19,
    title: "Deploy the app with Vercel",
    description: `
**Goal:** Make app live.  
**Tasks:**  
- Connect repo to Vercel  
- Add env variables in dashboard  
- Test production deployment
    `,
    status: "open",
    created: new Date("November 7, 2025 12:20:00"),
  },
  {
    id: 20,
    title: "Add CI/CD with GitHub Actions",
    description: `
**Goal:** Automate build and deployment.  
**Tasks:**  
- Setup GitHub workflow YAML  
- Run tests and lint on push  
- Auto-deploy to Vercel on merge
    `,
    status: "open",
    created: new Date("November 7, 2025 12:30:00"),
  },
];



export async function GET(request) {
  try {
    const issues = await prisma.issue.findMany();
    console.log(issues)
    return Response.json(issues);
  } catch (err) {
    console.error("❌ Prisma error:", err);
    return Response.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(request) {
    const body = await request.json();
    const newIssue = { id: Date.now(), title: body.title, status: 'open', description: body.description };
    issues.push(newIssue);
    return NextResponse.json(newIssue, { status: 201 });
}
