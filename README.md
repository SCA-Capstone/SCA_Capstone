## Getting Started


#### Supabase
1) Create a Supabase Account
2) Create a 'env.local' file in the root of the project
3) Include this in the 'env.local' file
    ```bash
    NEXT_PUBLIC_SUPABASE_URL=<your_supabase_project_url>
    NEXT_PUBLIC_SUPABASE_ANON_KEY=<your_supabase_anon_key>
    ```
4) Once you've created your project/organization, go to the home tab in the project
5) Go down to the page, until you see your project API's
6) Replace the temp keys to your projects keys, should look something like this:
    ```bash
    NEXT_PUBLIC_SUPABASE_URL=http://supabaseurl.supabase.co
    NEXT_PUBLIC_SUPABASE_ANON_KEY= supabase_api_key
    ```
7) You should be all set for auth
8) Random




#### Install Dependencies
```bash
npm i
```
#### Running the project
```bash
npm run dev
```
