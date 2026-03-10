#!/bin/bash

# Create all directories
mkdir -p .github/workflows
mkdir -p .husky
mkdir -p public/{images/{tours,guides,galleries,logos},fonts}

# Fix: Create route group directories separately (parentheses need escaping)
mkdir -p "src/app/(marketing)/"{about,contact}
mkdir -p "src/app/(tours)/tours/"[slug]
mkdir -p "src/app/(tours)/"booking
mkdir -p "src/app/(dashboard)/dashboard/"{tours,bookings,guides,analytics}
mkdir -p "src/app/(dashboard)/"api/admin

# Create API directories
mkdir -p src/app/api/{auth/[...nextauth],tours,bookings,payments,webhooks/stripe}

# Create other directories
mkdir -p src/components/{ui,sections/{Header,Hero,TourGrid,BookingForm,Footer},tours,booking,dashboard}
mkdir -p src/lib/{db,utils,config,middleware,email/templates}
mkdir -p src/{hooks,store,types,styles}
mkdir -p tests/{unit/{components,utils},integration/{api,booking-flow},e2e}
mkdir -p prisma drizzle

# Create essential files
touch .github/workflows/{ci.yml,deploy.yml}
touch .husky/pre-commit
touch public/favicon.ico
touch src/app/{layout.tsx,globals.css,loading.tsx,error.tsx}

# Fix: Quote paths with parentheses
touch "src/app/(marketing)/"page.tsx
touch "src/app/(marketing)/about/"page.tsx
touch "src/app/(marketing)/contact/"page.tsx
touch "src/app/(tours)/tours/"page.tsx
touch "src/app/(tours)/tours/"[slug]/page.tsx
touch "src/app/(tours)/booking/"page.tsx
touch "src/app/(dashboard)/dashboard/"layout.tsx
touch "src/app/(dashboard)/dashboard/"page.tsx

# Create API route files
touch src/app/api/{auth/[...nextauth],tours,bookings,payments,webhooks/stripe}/route.ts
touch "src/app/(dashboard)/api/admin/"route.ts

# Create component files
touch src/components/ui/{button.tsx,card.tsx,dialog.tsx,form.tsx,input.tsx,calendar.tsx,select.tsx}
touch src/components/sections/Header/{Header.tsx,Navigation.tsx}
touch src/components/sections/{Hero/Hero.tsx,TourGrid/TourGrid.tsx,BookingForm/BookingForm.tsx,Footer/Footer.tsx}
touch src/components/tours/{TourCard.tsx,TourFilters.tsx,TourGallery.tsx,AvailabilityCalendar.tsx}
touch src/components/booking/{BookingStepper.tsx,CustomerForm.tsx,PaymentForm.tsx}
touch src/components/dashboard/{Sidebar.tsx,StatsCards.tsx,DataTable.tsx}

# Create lib files
touch src/lib/db/{schema.ts,index.ts,seed.ts}
touch src/lib/utils/{date.ts,currency.ts,validation.ts,api.ts}
touch src/lib/config/{site.ts,env.ts,constants.ts}
touch src/lib/middleware/{auth.ts,rate-limit.ts}
touch src/lib/email/{send.ts,templates/{booking-confirmation.tsx,welcome.tsx}}

# Create other files
touch src/hooks/{useBooking.ts,useTours.ts,useCart.ts,useAvailability.ts}
touch src/store/{booking-store.ts,tour-store.ts,cart-store.ts}
touch src/types/{tour.ts,booking.ts,user.ts,index.ts}
touch src/styles/{variables.css,animations.css,components.css}

# Create config files
touch prisma/schema.prisma
touch drizzle/schema.ts
touch docker-compose.yml
touch Dockerfile
touch next.config.js
touch tailwind.config.js
touch postcss.config.js
touch .env.example
touch .eslintrc.json
touch .prettierrc
touch README.md
touch LICENSE

echo "✅ Folder structure created!"
echo "📁 Next steps:"
echo "1. Update package.json scripts"
echo "2. Configure next.config.js and tailwind.config.js"
echo "3. Set up Prisma schema"
echo "4. Add environment variables"