// Content for weeks 5-12. HTML strings; avoid literal ${ and backticks inside.
module.exports = [
// ===================== WEEK 5 =====================
{
  num:'05', accent:'purple', phase:'Build with AI',
  title:'Sign in with Gmail',
  desc:'Week 5 of the bootcamp: add Google (Gmail) login with Supabase Auth and put your app behind sign-in — real accounts and sessions on your live site.',
  time:'≈ 3 hours', ship:'real <b>Gmail login</b> working online',
  lead:'Your app gets a front door. This week you connect <b>Supabase</b>, add <b>Google (Gmail) login</b>, and put the app behind sign-in — real accounts and sessions, on your live Vercel URL. Custom data comes next week; this week is about who’s allowed in.',
  objectives:[
    'A <b>Supabase project</b> exists and your front end talks to it.',
    'Google (Gmail) login works end-to-end on your <b>live Vercel site</b>.',
    'The app knows who is signed in, and can <b>sign out</b>.',
    'You’ve decided what is <b>public vs private</b> and gated the UI accordingly.',
    'Supabase keys live in <b>environment variables</b>, never in git.',
  ],
  intro:{cls:'', icon:'🔐', html:'<b>Auth is where many projects stall — so we do it early and alone.</b> No new data models this week; just sign-in. Getting a real login working on the deployed site is a genuine milestone.'},
  steps:[
    {id:'project', toc:'Create a Supabase project', title:'Create a Supabase project', est:'≈ 15 min',
     body:`<p>Sign in at <a href="https://supabase.com" target="_blank" rel="noopener">supabase.com</a> with GitHub or your course Gmail, and create a <b>New project</b>. Pick a region close to you and save the database password somewhere safe.</p>
      <p>From <b>Project Settings → API</b>, copy two values you’ll need in a moment:</p>
      <pre class="code">Project URL   <span class="c"># https://xxxx.supabase.co</span>
anon public key   <span class="c"># safe to expose in the browser</span></pre>
      <div class="note"><span class="i">🔑</span><p>The <b>anon key</b> is meant to be public — it identifies your project, not a user. Your data is protected by Row-Level Security (next week), <b>not</b> by hiding this key.</p></div>`},
    {id:'google', toc:'Configure Google auth', title:'Configure Google login', est:'≈ 40 min',
     body:`<p>This is the fiddliest step — take it slowly. You’re telling Google "Supabase is allowed to sign users in", and telling Supabase your Google credentials.</p>
      <ol>
        <li>In the <a href="https://console.cloud.google.com" target="_blank" rel="noopener">Google Cloud console</a>, create (or pick) a project, configure the <b>OAuth consent screen</b> (External, add yourself as a test user).</li>
        <li>Create an <b>OAuth client ID</b> of type <b>Web application</b>. It gives you a <b>Client ID</b> and <b>Client secret</b>.</li>
        <li>In Supabase → <b>Authentication → Providers → Google</b>, paste the Client ID and secret, and <b>enable</b> it.</li>
        <li>Supabase shows a <b>callback URL</b> (like <code>https://xxxx.supabase.co/auth/v1/callback</code>). Add it to your Google client’s <b>Authorized redirect URIs</b>.</li>
      </ol>
      <div class="note warn"><span class="i">⚠️</span><p><b>Redirect URIs are exact-match.</b> A trailing slash or wrong protocol is the #1 cause of "redirect_uri_mismatch". Copy Supabase’s callback URL verbatim.</p></div>`},
    {id:'client', toc:'Wire the Supabase client', title:'Wire the Supabase client', est:'≈ 30 min',
     body:`<p>Add the Supabase client to your front end, reading config from env vars. In <code>frontend/</code>:</p>
      <pre class="code">npm install @supabase/supabase-js

<span class="c"># frontend/.env.local  (git-ignored)</span>
VITE_SUPABASE_URL=https://xxxx.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key</pre>
      <p>Then direct the agent — reviewing the diff as always:</p>
      <pre class="code"><span class="c">Prompt to your agent:</span>
<b>"Create frontend/src/lib/supabase.js that builds a Supabase client
from VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY. Add a 'Sign in
with Google' button that calls signInWithOAuth, and subscribe to
onAuthStateChange so the app knows the current user."</b></pre>`},
    {id:'gate', toc:'Gate the app', title:'Gate the app & sign out', est:'≈ 30 min',
     body:`<p>Now decide what a signed-out visitor sees, and show the real app only to signed-in users. Add a visible <b>Sign out</b> too.</p>
      <div class="decision"><div class="dh"><span class="tag">Decide</span> Public vs private &amp; your sign-in flow</div>
        <p>What can a signed-out visitor see — a marketing/landing screen, or nothing but a login button? Where does the app send people right after they sign in?</p>
        <p><b>Your call:</b> the public surface and the post-login landing screen. Keep it consistent with your <code>SPEC.md</code> sign-in section.</p></div>
      <pre class="code"><span class="c">Prompt to your agent:</span>
<b>"When no user is signed in, show only the login screen. When signed
in, show the app and a Sign out button that calls supabase.auth
.signOut(). Don't add data features yet."</b></pre>`},
    {id:'deploy', toc:'Ship it live', title:'Ship it live on Vercel', est:'≈ 20 min',
     body:`<p>Local login working? Now make it work on the deployed site.</p>
      <ol>
        <li>In your <b>Vercel</b> project → <b>Settings → Environment Variables</b>, add <code>VITE_SUPABASE_URL</code> and <code>VITE_SUPABASE_ANON_KEY</code>, then redeploy.</li>
        <li>In Supabase → <b>Authentication → URL Configuration</b>, add your <code>*.vercel.app</code> URL to <b>Site URL / Redirect URLs</b> so Google can return users there.</li>
        <li>Open your live URL and sign in with Gmail. You should land in the app as yourself.</li>
      </ol>
      <div class="note tip"><span class="i">✅</span><p><b>That’s the ship.</b> A stranger can open your URL, sign in with their Google account, and get a session — on the real internet.</p></div>`},
  ],
  done:[
    'A Supabase project is created and connected to the front end.',
    'Google login works on your <b>live Vercel URL</b>, not just locally.',
    'Signed-out users see only what you decided; signed-in users see the app and can sign out.',
    'Supabase URL + anon key are in Vercel env vars and <code>.env.local</code> — not committed.',
    'You can explain the login flow: button → Google → Supabase callback → session.',
  ],
  demo:[
    'Open your live URL signed out — show the public surface.',
    'Sign in with Gmail and land in the app.',
    'Show the signed-in state (your name/email) and sign out.',
    'One thing about the Google/Supabase setup that tripped you up.',
    'What data you’ll model and protect next week.',
  ],
  faqs:[
    {q:'"redirect_uri_mismatch" when I click sign in', a:'The callback URL in Google’s Authorized redirect URIs doesn’t exactly match Supabase’s. Copy Supabase’s callback URL again — exact protocol, host and path, no trailing slash — and paste it into the Google OAuth client.'},
    {q:'Login works locally but not on Vercel', a:'Two usual causes: the env vars aren’t set in Vercel (add them and redeploy), or your Vercel URL isn’t in Supabase’s allowed Site/Redirect URLs. Fix both and try in a fresh tab.'},
    {q:'Is it safe to expose the anon key?', a:'Yes — it’s designed to live in the browser. It only lets clients talk to your project; it does not grant access to data on its own. Next week’s Row-Level Security is what actually protects rows.'},
  ],
  prev:{href:'week-04.html', label:'Week 4 · Front end, live on Vercel'},
  next:{href:'week-06.html', label:'Week 6 · Your data in Supabase'},
},
// ===================== WEEK 6 =====================
{
  num:'06', accent:'purple', phase:'Build with AI',
  title:'Your data in Supabase',
  desc:'Week 6 of the bootcamp: model your workouts and goals as Postgres tables in Supabase, lock them down with Row-Level Security, and connect the front end to real live data.',
  time:'≈ 3–4 hours', ship:'create &amp; read your fitness data online',
  lead:'Now the app remembers things. You turn your <code>ARCH.md</code> data model into real <b>Postgres tables</b> in Supabase, lock them down with <b>Row-Level Security</b> so users only ever see their own rows, and replace last week’s mock data with live reads and writes.',
  objectives:[
    'Your tables (from <code>ARCH.md</code>) exist in Supabase with sensible columns and types.',
    '<b>Row-Level Security is on</b>, and users can only touch their own rows.',
    'The front end <b>creates and reads real data</b> — mock data is gone.',
    'The access rules in the database match what you wrote in <code>ARCH.md</code>.',
    'Loading, empty and error states are handled, not ignored.',
  ],
  intro:{cls:'', icon:'🗄️', html:'<b>Two ideas do the heavy lifting: tables and policies.</b> Tables say what you store; policies say who can see it. Get the policies right and your app is private by default — get them wrong and everyone sees everything.'},
  steps:[
    {id:'tables', toc:'Create your tables', title:'Create your tables', est:'≈ 40 min',
     body:`<p>Open your Supabase project’s <b>SQL editor</b> (or Table editor) and build the tables from your architecture. Every row that belongs to a user needs a <code>user_id</code> that points at the signed-in account.</p>
      <pre class="code"><span class="c">-- example: adapt to YOUR data model</span>
create table workouts (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references auth.users(id),
  type        text not null,
  duration    int  not null,   <span class="c">-- minutes</span>
  performed   date not null default now(),
  created_at  timestamptz default now()
);</pre>
      <p>Let the agent draft the SQL from <code>docs/ARCH.md</code>, but <b>you</b> read every column before running it:</p>
      <pre class="code"><span class="c">Prompt:</span> <b>"Generate Postgres CREATE TABLE statements from the data
model in docs/ARCH.md. Every user-owned table must have a user_id
referencing auth.users. Show me the SQL; don't run anything."</b></pre>`},
    {id:'rls', toc:'Turn on Row-Level Security', title:'Turn on Row-Level Security', est:'≈ 35 min',
     body:`<p>By default, with RLS <b>off</b>, the anon key could read every row. Turn RLS <b>on</b> for each table and add policies so a user only sees rows they own.</p>
      <pre class="code">alter table workouts enable row level security;

create policy "own rows - read"  on workouts
  for select using ( auth.uid() = user_id );
create policy "own rows - write" on workouts
  for insert with check ( auth.uid() = user_id );
create policy "own rows - modify" on workouts
  for update using ( auth.uid() = user_id );
create policy "own rows - delete" on workouts
  for delete using ( auth.uid() = user_id );</pre>
      <div class="decision"><div class="dh"><span class="tag">Decide</span> Your access rules</div>
        <p>Who can read and write each table? For a personal tracker it’s usually "only my own rows", but say it explicitly for every table — and make the policy match the sentence in <code>ARCH.md</code>.</p>
        <p><b>Your call:</b> the read/write rules per table, written in words first, then as policies.</p></div>
      <div class="note warn"><span class="i">⚠️</span><p><b>No table goes live without RLS.</b> An enabled table with <em>no</em> policy denies everything; a table with RLS <em>off</em> exposes everything. Check every table before you demo.</p></div>`},
    {id:'connect', toc:'Replace mock data', title:'Replace mock data with live queries', est:'≈ 45 min',
     body:`<p>Swap week 4’s in-memory store for real Supabase calls — keep your components the same, just change where the data comes from.</p>
      <pre class="code"><span class="c">Prompt to your agent:</span>
<b>"Replace the mock workout store with Supabase queries: insert a row
on Add (set user_id from the session), select the signed-in user's
rows on load, order by performed desc. Keep the component API the
same so the UI doesn't change."</b></pre>
      <p>Review the diff for two things: is <code>user_id</code> set from the <b>session</b> (not typed by the user), and does every read rely on RLS rather than a client-side filter you could forget?</p>`},
    {id:'states', toc:'Handle the states', title:'Handle loading, empty & errors', est:'≈ 20 min',
     body:`<p>Real data means real waiting and real failures. Make sure your screens handle three states gracefully:</p>
      <ul>
        <li><b>Loading</b> — a spinner or skeleton while the query runs.</li>
        <li><b>Empty</b> — a friendly "no workouts yet" instead of a blank page.</li>
        <li><b>Error</b> — show that something failed, and log the Supabase error to the console.</li>
      </ul>`},
    {id:'verify', toc:'Verify it’s private', title:'Verify it’s actually private', est:'≈ 20 min',
     body:`<p>Prove the security works — don’t just assume it.</p>
      <ol>
        <li>Sign in as yourself, add a couple of workouts, refresh — they persist and only <em>your</em> rows appear.</li>
        <li>In the Supabase <b>Table editor</b>, confirm the rows carry your <code>user_id</code>.</li>
        <li>Optional but convincing: sign in with a second Google account and confirm it sees an empty list, not your data.</li>
      </ol>
      <div class="note tip"><span class="i">✅</span><p><b>Commit and push.</b> Your live app now stores and protects real data — that’s the week’s ship.</p></div>`},
  ],
  done:[
    'Your tables exist in Supabase, matching the <code>ARCH.md</code> data model.',
    'RLS is enabled on every user-owned table with policies tied to <code>auth.uid()</code>.',
    'The front end creates and reads live data; mock data is removed.',
    'Loading, empty and error states are handled.',
    'You verified you can only see your own rows.',
  ],
  demo:[
    'Add a workout live and show it persist after refresh.',
    'Open the Table editor and point at the <code>user_id</code> on the row.',
    'Show one RLS policy and explain the rule in plain words.',
    'Show the empty/loading state you built.',
    'What logic you’ll move to a backend next week, and why.',
  ],
  faqs:[
    {q:'My own inserts are being rejected', a:'Usually a missing INSERT policy or a WITH CHECK that fails because user_id isn’t set to auth.uid(). Make sure the insert sets user_id from the session, and that you have a policy for insert (not just select).'},
    {q:'Data saves but nothing shows up', a:'Either the read policy is missing/too strict, or user_id on the row doesn’t match the signed-in user. Check the row in the Table editor and confirm the select policy uses auth.uid() = user_id.'},
    {q:'How do I add test data quickly?', a:'Add rows through your app while signed in (so user_id is set correctly), or insert via SQL using your own auth user id. Avoid inserting rows with a null or wrong user_id — RLS will hide them from you.'},
  ],
  prev:{href:'week-05.html', label:'Week 5 · Sign in with Gmail'},
  next:{href:'week-07.html', label:'Week 7 · A backend service'},
},
// ===================== WEEK 7 =====================
{
  num:'07', accent:'green', phase:'Backend & containers',
  title:'A backend service',
  desc:'Week 7 of the bootcamp: build a small API for logic the front end should not own — streaks, weekly summaries, maybe an AI insight — running locally.',
  time:'≈ 3–4 hours', ship:'backend API working <b>locally</b>',
  lead:'Some logic shouldn’t live in the browser. This week you build a small <b>API</b> — weekly summaries, streaks, maybe an AI insight — running on your own machine. It’s the first piece of the app you host yourself, and the thing you’ll containerise and ship to AWS later.',
  objectives:[
    'A backend service in <code>backend/</code> that runs locally.',
    'At least one real endpoint (e.g. <code>GET /summary/week</code>) plus <code>GET /health</code>.',
    'It reads from your online Supabase <b>securely</b>.',
    'Endpoints match the API contract in <code>ARCH.md</code>.',
    'You can explain why each piece of logic lives on the server, not the client.',
  ],
  intro:{cls:'', icon:'⚙️', html:'<b>Why a backend at all?</b> Anything the browser shouldn’t be trusted to do — or shouldn’t have to recompute — belongs on a server: aggregations, secrets, calls to paid APIs. Keep it small; one honest endpoint beats five stubs.'},
  steps:[
    {id:'shape', toc:'Choose stack & shape', title:'Choose your stack & shape', est:'≈ 20 min',
     body:`<p>Pick a language and a small web framework you’re willing to read — <b>FastAPI</b> (Python), <b>Express</b> (Node), or similar. There’s no wrong answer; pick what you can explain.</p>
      <div class="decision"><div class="dh"><span class="tag">Decide</span> What lives on the server &amp; your endpoints</div>
        <p>Which logic moves off the client? A streak or weekly total could be computed in the browser — but doing it on the server makes it trusted and reusable. List the endpoints you’ll build and what each returns.</p>
        <p><b>Your call:</b> the framework, and the 1–3 endpoints for v1. Keep <code>ARCH.md</code>’s API contract in sync.</p></div>`},
    {id:'scaffold', toc:'Scaffold the API', title:'Scaffold the API', est:'≈ 40 min',
     body:`<p>Direct the agent to scaffold the service in <code>backend/</code>, starting with a health check so you can confirm it’s alive.</p>
      <pre class="code"><span class="c">Prompt to your agent:</span>
<b>"Scaffold a small [FastAPI/Express] app in backend/. Add GET /health
returning { status: 'ok' }, read config from environment variables,
and add a placeholder GET /summary/week. Keep it minimal."</b></pre>
      <pre class="code"><span class="c"># health check should return</span>
GET /health  →  { "status": "ok" }</pre>`},
    {id:'supabase', toc:'Connect to Supabase', title:'Connect to Supabase securely', est:'≈ 30 min',
     body:`<p>Your backend needs data — but it must handle credentials carefully. Two common patterns:</p>
      <ul>
        <li><b>Verify the user’s token:</b> the front end sends the Supabase access token; the backend verifies it and acts as that user (respects RLS).</li>
        <li><b>Service role key:</b> the backend uses a privileged key for trusted server work. Powerful — it <em>bypasses RLS</em>, so guard it.</li>
      </ul>
      <div class="note warn"><span class="i">⚠️</span><p><b>The service role key is a master key.</b> It goes in the backend’s <code>.env</code> (git-ignored) and <b>never</b> near the browser or the repo. If it leaks, rotate it immediately.</p></div>`},
    {id:'logic', toc:'Implement the logic', title:'Implement the real logic', est:'≈ 45 min',
     body:`<p>Now build the actual endpoint — e.g. compute this week’s total minutes and current streak from the user’s workouts.</p>
      <pre class="code"><span class="c">Prompt:</span> <b>"Implement GET /summary/week: read the signed-in user's
workouts from Supabase, return total minutes this week and the current
daily streak. Add a tiny test for the streak calculation."</b></pre>
      <p>Keep the function small and testable. A single unit test on the streak math will save you a confusing demo later.</p>`},
    {id:'run', toc:'Run & call it', title:'Run & call it', est:'≈ 20 min',
     body:`<p>Start the server and hit it:</p>
      <pre class="code">cd backend
<span class="c"># FastAPI:</span> uvicorn app:app --reload --port 8000
<span class="c"># Express:</span> npm run dev

curl localhost:8000/health
curl localhost:8000/summary/week</pre>
      <p>Calling it from the front end? You’ll hit <b>CORS</b> — allow your front end’s origin in the backend. Store the backend’s base URL in a front-end env var so it’s easy to point at AWS later.</p>
      <div class="note tip"><span class="i">✅</span><p><b>Commit and push.</b> A running API with a real endpoint is this week’s ship — local is exactly where it should be for now.</p></div>`},
  ],
  done:[
    'A backend in <code>backend/</code> starts locally without errors.',
    '<code>GET /health</code> returns ok, and at least one real endpoint returns real data.',
    'It reads from Supabase securely (verified token or guarded service key).',
    'Secrets live in <code>backend/.env</code> (git-ignored); nothing sensitive is committed.',
    'Endpoints match — and are reflected in — the <code>ARCH.md</code> API contract.',
  ],
  demo:[
    'Curl <code>/health</code> and your real endpoint live in the terminal.',
    'Explain what the endpoint computes and why it’s on the server.',
    'Show how the backend authenticates to Supabase (and how you protect the key).',
    'Show your one test passing.',
    'How you’ll package this in a container next week.',
  ],
  faqs:[
    {q:'CORS error when the front end calls the API', a:'The browser blocks cross-origin calls unless the server allows them. Enable CORS in the backend for your front end’s origin (localhost and your Vercel URL). Don’t use a wildcard in production.'},
    {q:'Where exactly do the secrets go?', a:'In backend/.env locally (already git-ignored by the starter). Later they’ll be set as environment variables/secrets on AWS. They should never be committed or shipped inside the Docker image.'},
    {q:'Does my API need its own auth?', a:'If it touches user data, yes — verify the Supabase token so it acts as the right user, or keep the endpoint internal. An open endpoint with the service key behind it is a data leak waiting to happen.'},
  ],
  prev:{href:'week-06.html', label:'Week 6 · Your data in Supabase'},
  next:{href:'week-08.html', label:'Week 8 · Containerize it (local)'},
},
// ===================== WEEK 8 =====================
{
  num:'08', accent:'green', phase:'Backend & containers',
  title:'Containerize it (local)',
  desc:'Week 8 of the bootcamp: write a Dockerfile, build the image, and run your backend in a local container against your online Supabase.',
  time:'≈ 3 hours', ship:'<b>full local demo</b>: Vercel + Supabase online, backend in Docker',
  lead:'Your backend becomes portable. You write a <b>Dockerfile</b>, build an <b>image</b>, and run the backend in a container on your laptop — talking to your online Supabase. The exact same image will run on AWS unchanged in week 11. Build once, run anywhere.',
  objectives:[
    'A <b>Dockerfile</b> for your backend.',
    'The image <b>builds</b> and the container <b>runs</b> locally.',
    'The container reaches online Supabase using env/secrets — <b>not baked into the image</b>.',
    'A full local demo: front end on Vercel, data on Supabase, backend in Docker.',
    'You can explain what each line of the Dockerfile does.',
  ],
  intro:{cls:'', icon:'📦', html:'<b>A container is your app plus everything it needs to run, frozen into one image.</b> "Works on my machine" stops being a caveat — the image <em>is</em> the machine. That’s why week 11’s move to AWS is almost boring: same image, new host.'},
  steps:[
    {id:'docker', toc:'Install Docker', title:'Install Docker Desktop', est:'≈ 15 min',
     body:`<p>Install <a href="https://www.docker.com/products/docker-desktop/" target="_blank" rel="noopener">Docker Desktop</a> and confirm it works:</p>
      <pre class="code">docker --version
docker run hello-world   <span class="c"># prints a welcome message</span></pre>`},
    {id:'dockerfile', toc:'Write the Dockerfile', title:'Write the Dockerfile', est:'≈ 35 min',
     body:`<p>The starter includes a <code>backend/Dockerfile</code> — review and adapt it to your stack. A Dockerfile is a recipe: start from a base image, copy your code, install deps, expose a port, and say how to start.</p>
      <pre class="code"><span class="c"># example (Python/FastAPI) — adapt to yours</span>
FROM python:3.12-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
EXPOSE 8000
CMD ["uvicorn","app:app","--host","0.0.0.0","--port","8000"]</pre>
      <p>Add a <code>.dockerignore</code> so junk (and secrets) never enter the image:</p>
      <pre class="code"><span class="c"># .dockerignore</span>
.env
__pycache__/
node_modules/
.git</pre>`},
    {id:'build', toc:'Build the image', title:'Build the image', est:'≈ 20 min',
     body:`<p>From <code>backend/</code>, build and tag the image, then list it:</p>
      <pre class="code">cd backend
docker build -t fitness-backend .
docker images        <span class="c"># see fitness-backend in the list</span></pre>
      <p>Read the build output — each step is a layer. If a step fails, the log names it; fix and rebuild (cached layers make the retry fast).</p>`},
    {id:'run', toc:'Run the container', title:'Run the container', est:'≈ 25 min',
     body:`<p>Run it, mapping a port and passing secrets from a file — <b>never</b> baked into the image:</p>
      <pre class="code">docker run -p 8000:8000 --env-file .env fitness-backend

curl localhost:8000/health   <span class="c"># reaches the containerised API</span></pre>
      <p><code>-p 8000:8000</code> maps your laptop’s port to the container’s; <code>--env-file .env</code> injects config at run time so the same image stays generic.</p>
      <div class="decision"><div class="dh"><span class="tag">Decide</span> Container setup &amp; how you handle secrets</div>
        <p>How does config reach the container — <code>--env-file</code>, individual <code>-e</code> flags, a compose file? And how do you keep the image free of secrets?</p>
        <p><b>Your call:</b> your run command and secret-handling approach, documented in the README so future-you (and AWS) can repeat it.</p></div>
      <div class="note warn"><span class="i">⚠️</span><p><b>Never <code>COPY .env</code> into the image.</b> Anyone who pulls the image would get your keys. Secrets are injected at run time, always.</p></div>`},
    {id:'demo', toc:'Full-stack demo', title:'The full local demo', est:'≈ 20 min',
     body:`<p>Wire the whole thing together: the <b>Vercel</b> front end and <b>Supabase</b> data are already online; your <b>backend runs in Docker</b> locally.</p>
      <p>Point a locally-run front end (or an API client) at <code>localhost:8000</code> and show a backend-powered number — a weekly total or streak — flowing from container to screen.</p>
      <div class="note"><span class="i">💡</span><p><b>Reality check:</b> your <em>deployed</em> Vercel site can’t reach <code>localhost</code> on your laptop. For this week’s demo, run the front end locally against the container (or hit the API with curl). The public backend arrives in week 11.</p></div>
      <div class="note tip"><span class="i">✅</span><p><b>Ship:</b> front end + data online, backend containerised locally, all talking. Commit the Dockerfile and <code>.dockerignore</code>.</p></div>`},
  ],
  done:[
    'A working <code>backend/Dockerfile</code> and a <code>.dockerignore</code> exist.',
    '<code>docker build</code> succeeds and <code>docker run</code> serves your API.',
    'The container reaches Supabase via injected env vars — no secrets in the image.',
    'You demoed front end (Vercel) + data (Supabase) + backend (Docker) together.',
    'The run command and config approach are documented in the README.',
  ],
  demo:[
    'Show the Dockerfile and explain two or three lines.',
    'Build the image live (or show it in <code>docker images</code>).',
    'Run the container and curl an endpoint.',
    'Show a backend-powered value in the UI, pulled from the container.',
    'One Docker gotcha you hit and how you solved it.',
  ],
  faqs:[
    {q:'My image is huge', a:'Use a slim base image (e.g. -slim), add a .dockerignore, and don’t copy node_modules/venv into the image — install inside it instead. Multi-stage builds help for compiled deps.'},
    {q:'The container can’t reach Supabase', a:'Almost always missing env vars — confirm your --env-file is passed and the keys are correct. Remember the container has its own environment; nothing from your shell carries over unless you pass it.'},
    {q:'"port is already allocated"', a:'Something else is using 8000. Stop it, or map a different host port, e.g. -p 8080:8000, and hit localhost:8080.'},
  ],
  prev:{href:'week-07.html', label:'Week 7 · A backend service'},
  next:{href:'week-09.html', label:'Week 9 · Pause & integrate'},
},
// ===================== WEEK 9 =====================
{
  num:'09', accent:'green', phase:'Backend & containers',
  title:'Pause & integrate',
  desc:'Week 9 of the bootcamp: a checkpoint week — wire everything cleanly, sort out env vars and secrets, tidy the repo and README, and reconcile the docs with reality.',
  time:'≈ 2–3 hours', ship:'a clean, demoable <b>v1</b> — nobody left behind',
  lead:'A deliberate breather. No new features — you wire everything cleanly, sort out env vars and secrets, tidy the repo and README, and pay down the debts that pile up when you move fast. The goal is a <b>clean, demoable v1</b> with nobody left behind.',
  objectives:[
    'Every part connects cleanly; the happy path works end to end.',
    'Env vars and secrets are consistent and documented; <code>.env.example</code> is current.',
    'The repo is tidy: the README explains setup, dead code is gone, git history is sane.',
    '<code>SPEC.md</code> and <code>ARCH.md</code> match what you actually built.',
    'Your known issues are written down, not carried in your head.',
  ],
  intro:{cls:'tip', icon:'🧹', html:'<b>Integration weeks are where good projects get their polish.</b> If you’re behind, this is your catch-up week — use it. If you’re ahead, harden what you have; a clean v1 is worth more than a fragile v1.2.'},
  steps:[
    {id:'trace', toc:'Trace the happy path', title:'Trace the happy path', est:'≈ 30 min',
     body:`<p>Walk your app the way a new user would: sign in → add data → see it → view a backend-powered summary. Write down every rough edge you hit — don’t fix yet, just list.</p>
      <p>Then fix the list, smallest first. Most "bugs" this week are loose wiring: a missing env var, a stale URL, an unhandled empty state.</p>`},
    {id:'secrets', toc:'Sort secrets & config', title:'Sort secrets & config', est:'≈ 30 min',
     body:`<p>Make configuration boring and consistent across front end, backend, Vercel and (soon) AWS.</p>
      <ul>
        <li>Use one naming convention; update <code>.env.example</code> so it lists every variable with a short comment.</li>
        <li>Confirm nothing secret is in git history, not just the latest commit.</li>
      </ul>
      <pre class="code"><span class="c"># quick sweep for accidentally-committed secrets</span>
git grep -i -E "key|secret|password|token" -- . ':!*.md'</pre>
      <div class="decision"><div class="dh"><span class="tag">Decide</span> Config, secrets handling &amp; repo hygiene</div>
        <p>Where does each secret live, how is it named, and what’s your rule for adding a new one? Write the convention down once so it stops being ad-hoc.</p>
        <p><b>Your call:</b> your config/secrets convention and repo structure standards.</p></div>
      <div class="note warn"><span class="i">⚠️</span><p>If you find a real secret in history, <b>rotate it</b> (regenerate the key) — removing the file isn’t enough once it’s been pushed.</p></div>`},
    {id:'tidy', toc:'Tidy repo & README', title:'Tidy the repo & README', est:'≈ 30 min',
     body:`<p>Your README is the front door for a reviewer (or future you). Make it real:</p>
      <ul>
        <li>What the app is, in two lines.</li>
        <li>How to run each part locally (front end, backend, container) — copy-pasteable.</li>
        <li>Where things live and what env vars are needed.</li>
      </ul>
      <p>Delete leftover mock data, commented-out code and dead files. A tidy repo is easier to reason about — and to hand to an agent.</p>`},
    {id:'docs', toc:'Reconcile the docs', title:'Reconcile the docs', est:'≈ 25 min',
     body:`<p>Reality has drifted from the plan — that’s normal. Bring <code>SPEC.md</code> and <code>ARCH.md</code> back in line with what you actually built, and note any decisions you made along the way.</p>
      <div class="note rule"><span class="i">🧠</span><p><span class="k">The rule, applied</span>If the build won an argument with the doc, update the doc. A confident-but-wrong architecture file is worse than none — and you can’t explain a system your own docs misdescribe.</p></div>`},
    {id:'debt', toc:'Pay down debt', title:'Pay down debt & help others', est:'≈ 25 min',
     body:`<p>Knock out the small "I’ll fix it later" items, and capture the ones you won’t get to in a short <code>KNOWN-ISSUES.md</code> or a TODO section — honesty beats a hidden landmine.</p>
      <p>This is also a <b>learn-together</b> week: if a teammate is stuck, pairing to unblock them is exactly the assignment. Nobody left behind.</p>
      <div class="note tip"><span class="i">✅</span><p><b>Ship:</b> a clean, documented, demoable v1 on <code>main</code> — the stable base you’ll automate and deploy in the final phase.</p></div>`},
  ],
  done:[
    'The happy path works end to end without manual fiddling.',
    '<code>.env.example</code> lists every variable; no secrets are in git history.',
    'The README explains what the app is and how to run every part.',
    'Dead code and mock leftovers are removed; the repo is tidy.',
    '<code>SPEC.md</code> / <code>ARCH.md</code> reflect reality; known issues are written down.',
  ],
  demo:[
    'Run the happy path start to finish, live.',
    'Show your README and <code>.env.example</code>.',
    'Point at one thing you cleaned up or reconciled this week.',
    'Show your known-issues list — owning gaps is the point.',
    'What you’ll automate first when GitOps starts next week.',
  ],
  faqs:[
    {q:'I’m behind — is that okay?', a:'Yes — that’s exactly what this checkpoint is for. Use it to catch up to a clean v1 rather than pushing new features. Ask for help; pairing this week is encouraged.'},
    {q:'What counts as "clean"?', a:'A stranger can clone the repo, read the README, set the env vars, and run each part without asking you questions. If that’s true, it’s clean enough.'},
    {q:'Should I add tests now?', a:'A few smoke tests on critical paths (auth works, an endpoint returns data) are a great investment before you wire CI next week — they’ll catch regressions automatically.'},
  ],
  prev:{href:'week-08.html', label:'Week 8 · Containerize it (local)'},
  next:{href:'week-10.html', label:'Week 10 · GitOps with Actions'},
},
// ===================== WEEK 10 =====================
{
  num:'10', accent:'amber', phase:'GitOps & cloud',
  title:'GitOps with Actions',
  desc:'Week 10 of the bootcamp: add CI (lint/test/build on every push) and CD (auto-deploy the front end), and learn the GitOps mindset where a push is the trigger.',
  time:'≈ 3 hours', ship:'push → <b>automatic</b> build and deploy',
  lead:'Your repo starts working for you. You add <b>Continuous Integration</b> (checks on every push) and <b>Continuous Deployment</b> (auto-deploy the front end), and learn the <b>GitOps</b> mindset: git is the source of truth, and a push — not a human — is what triggers the pipeline.',
  objectives:[
    'A GitHub Actions workflow runs on <b>every push</b> (lint / test / build).',
    'Failing checks block a broken merge; green checks give you confidence.',
    'The front end <b>auto-deploys</b> on push to <code>main</code>.',
    'You’ve chosen which checks are required, and protected <code>main</code>.',
    'You can read a workflow run and explain what each step did.',
  ],
  intro:{cls:'', icon:'🔁', html:'<b>GitOps in one line: the repo is the plan, and the pipeline makes reality match it.</b> No more deploying by hand or "it works on my laptop". You push; automation checks and ships. Git history becomes the record of what happened.'},
  steps:[
    {id:'gitops', toc:'Understand GitOps', title:'Understand GitOps', est:'≈ 15 min · read',
     body:`<p>Three ideas carry the whole week:</p>
      <ul>
        <li><b>Git is the source of truth</b> — the code in <code>main</code> is what should be running.</li>
        <li><b>A push is the trigger</b> — changes flow through automation, not manual steps.</li>
        <li><b>Checks gate changes</b> — code that fails the pipeline doesn’t reach <code>main</code>.</li>
      </ul>`},
    {id:'ci', toc:'Add CI', title:'Add continuous integration', est:'≈ 45 min',
     body:`<p>The starter ships <code>.github/workflows/ci.yml</code> — adapt it to your front end. A minimal pipeline checks out the code, installs deps, and runs lint / test / build.</p>
      <pre class="code"><span class="c"># .github/workflows/ci.yml (sketch)</span>
name: CI
on: [push, pull_request]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 20 }
      - run: npm ci
      - run: npm run lint
      - run: npm test --if-present
      - run: npm run build</pre>
      <div class="decision"><div class="dh"><span class="tag">Decide</span> Pipeline stages &amp; which checks must pass</div>
        <p>What runs on every push, and which checks are <b>required</b> to merge? Lint + build is a sensible minimum; add tests as you write them.</p>
        <p><b>Your call:</b> your stages and your "must be green to merge" set.</p></div>`},
    {id:'fail', toc:'Make it fail on purpose', title:'Make it fail (on purpose)', est:'≈ 20 min',
     body:`<p>A pipeline you’ve never seen fail is a pipeline you don’t trust. Break something small — a lint error or a failing assertion — push it, and watch the run go <b>red</b>.</p>
      <p>Open the failed run, read the log, find the step that failed, fix it, and watch it go <b>green</b>. Reading CI logs is the actual skill here.</p>`},
    {id:'cd', toc:'Wire CD', title:'Confirm continuous deployment', est:'≈ 20 min',
     body:`<p>You already have CD from week 4: <b>Vercel</b> deploys on push. Make it deliberate:</p>
      <ul>
        <li>Pushing to <code>main</code> updates <b>production</b>.</li>
        <li>Opening a pull request gives you a <b>preview deployment</b> — a live URL for that branch.</li>
      </ul>
      <p>Now every change is visible before it ships. Use PRs and preview URLs to review UI changes like a real team.</p>`},
    {id:'protect', toc:'Protect main', title:'Protect main', est:'≈ 20 min',
     body:`<p>Tie it together with a <b>branch protection rule</b> on <code>main</code>: require your CI check to pass before a PR can merge.</p>
      <p>From here on you work on branches, open PRs, let CI vote, and merge on green. That’s the professional loop — and it’s enforced, not just intended.</p>
      <div class="note tip"><span class="i">✅</span><p><b>Ship:</b> a push now triggers automatic checks and an automatic deploy — no manual steps in the path to production.</p></div>`},
  ],
  done:[
    'A GitHub Actions workflow runs lint/test/build on every push and PR.',
    'You’ve watched a run fail and fixed it from the logs.',
    'Front end auto-deploys to production on <code>main</code>; PRs get preview URLs.',
    '<code>main</code> is protected — required checks must pass to merge.',
    'You can open a workflow run and explain each step.',
  ],
  demo:[
    'Open a PR and show CI running on it.',
    'Show a red run and the log line that caused it.',
    'Merge on green and show the automatic production deploy.',
    'Show the preview URL from a PR.',
    'Which check you made required, and why.',
  ],
  faqs:[
    {q:'My workflow doesn’t run at all', a:'Check the file is at .github/workflows/*.yml, valid YAML, and that the on: triggers match your branch. A wrong indent or branch filter silently disables it — the Actions tab shows parse errors.'},
    {q:'How do I use secrets in Actions?', a:'Store them as repository or environment secrets in GitHub settings and reference them via the secrets context in the workflow. Never echo them to logs or commit them.'},
    {q:'CI is slow', a:'Cache dependencies (actions/setup-node has a cache option), run independent jobs in parallel, and only build what changed. A tight pipeline is one people actually wait for.'},
  ],
  prev:{href:'week-09.html', label:'Week 9 · Pause & integrate'},
  next:{href:'week-11.html', label:'Week 11 · Ship the backend to AWS'},
},
// ===================== WEEK 11 =====================
{
  num:'11', accent:'amber', phase:'GitOps & cloud',
  title:'Ship the backend to AWS',
  desc:'Week 11 of the bootcamp: push your Docker image to Amazon ECR and run the container on AWS with secrets and a health check — the full app online.',
  time:'≈ 4 hours', ship:'backend <b>live on AWS</b> — the full app online',
  lead:'The payoff. The same Docker image from week 8 goes to the cloud: you push it to a registry (<b>Amazon ECR</b>) and run the container on <b>AWS</b> with secrets and a health check. Nothing about your app changes — that’s the whole point of containers — and now the entire stack is online.',
  objectives:[
    'Your backend image is stored in <b>Amazon ECR</b>.',
    'The container <b>runs on AWS</b> with a public URL.',
    'Secrets are set in AWS (not in the image), and the <b>health check passes</b>.',
    'Your deployed front end talks to the AWS backend.',
    'You’ve set a <b>billing alert</b> and know how to tear it down.',
  ],
  intro:{cls:'warn', icon:'💳', html:'<b>Before anything else: set an AWS budget alert.</b> Cloud resources cost money by the hour. Use the smallest sizes, and remember week 12 is teardown. A $5 alert email is cheaper than a surprise bill.'},
  steps:[
    {id:'setup', toc:'AWS & the registry', title:'Set up AWS & the registry', est:'≈ 40 min',
     body:`<p>Create an <a href="https://aws.amazon.com" target="_blank" rel="noopener">AWS account</a> if you don’t have one, and — first thing — set a <b>Budget alert</b> in Billing. Then install the AWS CLI and create a registry repo.</p>
      <pre class="code">aws --version
aws configure                 <span class="c"># set your access keys + region</span>
aws ecr create-repository --repository-name fitness-backend</pre>
      <div class="note warn"><span class="i">⚠️</span><p>Your AWS access keys are <b>prohibited from the repo and the browser</b>. They live in your local AWS config / a secrets manager only.</p></div>`},
    {id:'push', toc:'Push image to ECR', title:'Push your image to ECR', est:'≈ 40 min',
     body:`<p>Authenticate Docker to ECR, tag your image with the registry URL, and push. Replace <code>ACCOUNT</code> and <code>REGION</code> with yours.</p>
      <pre class="code">aws ecr get-login-password --region REGION \\
  | docker login --username AWS --password-stdin \\
    ACCOUNT.dkr.ecr.REGION.amazonaws.com

docker build --platform linux/amd64 -t fitness-backend .
docker tag fitness-backend \\
  ACCOUNT.dkr.ecr.REGION.amazonaws.com/fitness-backend:latest
docker push \\
  ACCOUNT.dkr.ecr.REGION.amazonaws.com/fitness-backend:latest</pre>
      <div class="note"><span class="i">💡</span><p>Build for <code>linux/amd64</code> — especially on an Apple Silicon Mac — or the cloud host may refuse to run an arm64 image.</p></div>
      <div class="decision"><div class="dh"><span class="tag">Decide</span> Your AWS runtime &amp; rollout</div>
        <p><b>App Runner</b> (simplest — point it at the image, get a URL), <b>ECS</b> (more control), or <b>EC2</b> (most manual)? Pick what you can operate and explain.</p>
        <p><b>Your call:</b> the runtime and how new image versions roll out.</p></div>`},
    {id:'run', toc:'Run the container', title:'Run the container on AWS', est:'≈ 40 min',
     body:`<p>The simplest path is <b>AWS App Runner</b>: create a service, point it at your ECR image, set the port, and it gives you a public HTTPS URL and runs a health check for you. (ECS/EC2 are alternatives if you chose them.)</p>
      <ul>
        <li>Source: your ECR image.</li>
        <li>Port: whatever your container exposes (e.g. 8000).</li>
        <li>Health check path: <code>/health</code>.</li>
      </ul>`},
    {id:'secrets', toc:'Wire secrets & health', title:'Wire secrets & health', est:'≈ 30 min',
     body:`<p>Set your Supabase keys and any config as <b>environment variables / secrets</b> in the AWS service — the same values from your <code>.env</code>, now injected by the platform. Confirm the deployment is healthy:</p>
      <pre class="code">curl https://your-service.awsapprunner.com/health
<span class="c"># { "status": "ok" }</span></pre>
      <p>If it’s unhealthy, read the service logs — usually a missing env var or the wrong port/health path.</p>`},
    {id:'connect', toc:'Point the front end', title:'Point the front end at it', est:'≈ 30 min',
     body:`<p>Set your front end’s backend-URL env var in <b>Vercel</b> to the new AWS URL and redeploy. Allow the Vercel origin in the backend’s <b>CORS</b>. Now your deployed site calls your cloud backend — the full app is live.</p>
      <p>Optional: extend your Actions workflow to <b>build and push the image</b> to ECR when <code>backend/</code> changes, so deploys stay push-driven.</p>
      <div class="note tip"><span class="i">🚀</span><p><b>Ship:</b> front end on Vercel, data + auth on Supabase, backend container on AWS — every piece online and talking. That’s the whole system.</p></div>`},
  ],
  done:[
    'Your image is in ECR and runs as a service on AWS with a public URL.',
    'Secrets are set on AWS; nothing sensitive is in the image or repo.',
    '<code>/health</code> returns ok on the AWS URL.',
    'The deployed front end successfully calls the AWS backend.',
    'A billing alert is set, and you know which resources to remove next week.',
  ],
  demo:[
    'Hit the AWS <code>/health</code> URL live.',
    'Show a backend-powered value in the deployed app, served from AWS.',
    'Explain your runtime choice (App Runner / ECS / EC2).',
    'Show where the secrets live on AWS (not in the image).',
    'One cloud gotcha (platform/arch, port, CORS) and your fix.',
  ],
  faqs:[
    {q:'The image won’t start on AWS', a:'Most often an architecture mismatch — rebuild with --platform linux/amd64 and push again. Otherwise check the start command and that the exposed port matches the service’s configured port.'},
    {q:'Health check keeps failing', a:'Confirm the health path (/health) and port are exactly what the service expects, and that required env vars are set — a container that crashes on a missing key will never pass a health check. Read the logs.'},
    {q:'I’m worried about cost', a:'Use the smallest instance sizes, keep one small service, and set a budget alert. Everything here tears down in week 12 — and Supabase/Vercel free tiers cost nothing to leave running.'},
  ],
  prev:{href:'week-10.html', label:'Week 10 · GitOps with Actions'},
  next:{href:'week-12.html', label:'Week 12 · Demo day & teardown'},
},
// ===================== WEEK 12 =====================
{
  num:'12', accent:'amber', phase:'GitOps & cloud',
  title:'Demo day & teardown',
  desc:'Week 12 of the bootcamp: present the full journey — spec to cloud — write a short reflection, and tear down your AWS resources to avoid bills.',
  time:'≈ 2–3 hours', ship:'a live demo + a short write-up',
  lead:'You built and shipped a real app. This week you present the whole journey — spec → architecture → AI build → GitOps → cloud — reflect on what you’d do differently, and then <b>tear down your AWS resources</b> so you don’t get billed. Ending clean is part of the craft.',
  objectives:[
    'A clear demo of the full journey and the live app.',
    'A short written <b>reflection / write-up</b>.',
    'AWS resources <b>torn down</b> — no surprise bills.',
    'A plan for what you’d build next.',
    'You can explain any part of your system, including what the AI got wrong.',
  ],
  intro:{cls:'', icon:'🎉', html:'<b>You went from an empty folder to a deployed, full-stack app — directing AI the way modern teams do.</b> Today is about telling that story well, then responsibly switching off the meter.'},
  steps:[
    {id:'story', toc:'Build your demo story', title:'Build your demo story', est:'≈ 30 min',
     body:`<p>Shape the arc so it lands: the problem → your <b>spec</b> → your <b>architecture</b> → building with <b>AI</b> → <b>GitOps</b> → the <b>cloud</b>. Show the live app first (hook them), then explain how it works.</p>
      <div class="decision"><div class="dh"><span class="tag">Decide</span> Your demo story &amp; what’s next</div>
        <p>What’s the one thing you’re proudest of, and the one thing you’d rebuild? Where would v2 go — a real feature from your non-goals list?</p>
        <p><b>Your call:</b> the narrative you tell and the next milestone you’d set.</p></div>`},
    {id:'rehearse', toc:'Rehearse the live demo', title:'Rehearse the live demo', est:'≈ 30 min',
     body:`<p>Run it end to end on the <b>live URL</b>: sign in with Gmail, add data, show a backend-powered number from AWS. Then flip to the engineering story — the repo, a diff the agent produced, the CI pipeline going green, and your architecture doc.</p>
      <div class="note"><span class="i">🗣️</span><p><b>Talk, don’t read.</b> Show the running system and narrate it. Owning "here’s what the AI got wrong and how I caught it" is the most impressive part of any demo.</p></div>`},
    {id:'writeup', toc:'Write the reflection', title:'Write the reflection', est:'≈ 25 min',
     body:`<p>Capture what you learned in a short <code>WRITEUP.md</code> (or a README section): the hardest bug, one thing the AI got wrong, a decision you’d change, and what you’d build next. This is the artefact you’ll actually reread — and can show off.</p>`},
    {id:'teardown', toc:'Tear down AWS', title:'Tear down AWS', est:'≈ 25 min',
     body:`<p>Switch off the meter. Remove the paid resources you created in week 11:</p>
      <pre class="code"><span class="c"># delete the running service (App Runner example)</span>
aws apprunner delete-service --service-arn YOUR_SERVICE_ARN

<span class="c"># remove images / the registry repo</span>
aws ecr delete-repository --repository-name fitness-backend --force</pre>
      <p>Then <b>confirm in the AWS console and Billing</b> that nothing paid is still running (ECS/EC2, load balancers, NAT gateways are common stragglers).</p>
      <div class="note warn"><span class="i">⚠️</span><p><b>Deleting cloud resources is permanent.</b> That’s intended here — but double-check you’re removing the <em>bootcamp</em> resources and nothing else in the account.</p></div>`},
    {id:'ship', toc:'Ship it & celebrate', title:'Ship the write-up & celebrate', est:'≈ 15 min',
     body:`<p>Commit your write-up and make a final, clean push. Keep the free tiers (Vercel + Supabase) running if you want a live portfolio link — they cost nothing.</p>
      <div class="note tip"><span class="i">✅</span><p><b>You did it:</b> a real, deployed, full-stack app you can explain end to end — and the judgement to know when to build, when to direct the AI, and when to switch things off.</p></div>`},
  ],
  done:[
    'You delivered a clear demo of the full journey on the live app.',
    'A short reflection / write-up is committed.',
    'All paid AWS resources are deleted and confirmed gone in Billing.',
    'You have a concrete idea of what you’d build next.',
    'You can explain every part of your system — including the AI’s mistakes.',
  ],
  demo:[
    'Open the live app and run the core journey.',
    'Tell the spec → arch → AI → GitOps → cloud story with the repo open.',
    'Show one thing the AI got wrong and how you fixed it.',
    'Show your architecture doc and one decision you’d defend.',
    'What you’d build in v2.',
  ],
  faqs:[
    {q:'What should I keep running after the course?', a:'Vercel and Supabase free tiers cost nothing, so you can leave the front end and data live as a portfolio link. Only the AWS backend costs money — that’s the part to tear down (or redeploy briefly when you want to demo).'},
    {q:'How do I be sure AWS is really off?', a:'Check the Billing dashboard and the service consoles (App Runner/ECS/EC2, ECR, load balancers). If a budget alert stays quiet over the next few days, you’re clear.'},
    {q:'Can I put this on my portfolio?', a:'Absolutely — that’s the goal. Link the live app, the repo, and your write-up. Being able to explain the architecture and the AI’s role is exactly what stands out.'},
  ],
  prev:{href:'week-11.html', label:'Week 11 · Ship the backend to AWS'},
  next:{href:'../index.html#roadmap', label:'You shipped it 🎉 · Back to the roadmap'},
},
];
