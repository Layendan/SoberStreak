# SoberStreak

A web application to help track sobriety milestones and celebrate progress in recovery. Built with SvelteKit, this app allows users to create and manage multiple sobriety counters, providing real-time tracking of days, hours, minutes, and seconds since their last drink.

## Features

- **Real-time Counter**: Live tracking of sobriety time in days, hours, minutes, and seconds
- **Multiple Counters**: Create and manage multiple sobriety counters for different substances or goals
- **User Authentication**: Secure sign-in to save and access your personal counters
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Data Persistence**: Your counters are safely stored in a PostgreSQL database

## Tech Stack

- **Frontend**: SvelteKit 2.x with Svelte 5
- **Styling**: Tailwind CSS 4 with DaisyUI components
- **Authentication**: Auth.js (NextAuth) for SvelteKit
- **Database**: PostgreSQL with Drizzle ORM
- **Development**: TypeScript, Vite, ESLint, Prettier
- **Deployment**: Node.js adapter

## Prerequisites

- Node.js 18+
- pnpm (recommended) or npm
- Docker (for local database)

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Layendan/sobriety-counter.git
cd sobriety-counter
```

### 2. Install dependencies

```bash
pnpm install
```

### 3. Set up the database

Start the PostgreSQL database using Docker:

```bash
pnpm run db:start
```

Push the database schema:

```bash
pnpm run db:push
```

### 4. Configure environment variables

Create a `.env` file in the root directory and add your environment variables:

```env
# Database
DATABASE_URL="postgresql://root:valentina@localhost:5432/sobriety_counter"

# Auth.js
AUTH_SECRET="your-auth-secret"
# Add your OAuth provider credentials here
```

### 5. Start the development server

```bash
pnpm run dev
```

Visit `http://localhost:5173` to see the application.

## Available Scripts

- `pnpm run dev` - Start development server
- `pnpm run build` - Build for production
- `pnpm run preview` - Preview production build locally
- `pnpm run check` - Run type checking
- `pnpm run lint` - Run ESLint and Prettier checks
- `pnpm run format` - Format code with Prettier
- `pnpm run db:start` - Start PostgreSQL database with Docker
- `pnpm run db:push` - Push database schema changes
- `pnpm run db:migrate` - Run database migrations
- `pnpm run db:studio` - Open Drizzle Studio for database management

## Database Management

This project uses Drizzle ORM with PostgreSQL. The database schema is defined in `src/lib/server/db/schema.ts`.

To view and manage your database:

```bash
pnpm run db:studio
```

## Project Structure

```text
src/
├── app.html              # HTML template
├── app.css               # Global styles
├── auth.ts               # Authentication configuration
├── hooks.server.ts       # Server-side hooks
├── lib/
│   ├── components/       # Reusable Svelte components
│   │   ├── Counter.svelte
│   │   └── CounterWrapper.svelte
│   └── server/
│       └── db/           # Database configuration and schema
│           ├── index.ts
│           └── schema.ts
└── routes/               # SvelteKit routes
    ├── +layout.server.ts
    ├── +layout.svelte
    ├── +page.server.ts
    └── +page.svelte
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is open source and available under the [MIT License](LICENSE).

## Support

If you're struggling with addiction, please reach out for help:

- National Suicide Prevention Lifeline: 988
- SAMHSA National Helpline: 1-800-662-4357
- Alcoholics Anonymous: [aa.org](https://www.aa.org)
- Narcotics Anonymous: [na.org](https://www.na.org)

Remember: Recovery is a journey, and every day counts. Stay strong! 💪
