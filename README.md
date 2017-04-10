## Installation

1. Install [nodeJs](https://nodejs.org)
project have dependencies that require Node 6.9.0 or higher, together with NPM 3 or higher.

2. Install angular/cli
```
npm install -g @angular/cli
```
3. Install dependencies
```
npm install
```

## Development server
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build
Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the ` --env=prod` for a production build.

## How to deploy
1. Write config of firebase. Open `/environments/environment.prod.ts` and complete firebase data from your firebase console.
2. Execute `ng build --env=prod`. This will create a folder called dist.
3. Place all the files and folders from dist directory to your Apache root directory on your server.
4. Setup apache to serve routes to index.html. You have two methods you can use, either edit your virtual host or use .htaccess in your website root directory.
 
 Option 1: Virtual Host
 
 ```
 <VirtualHost *:80>
     ServerName my-app
 
     DocumentRoot /path/to/app
 
     <Directory /path/to/app>
         RewriteEngine on
 
         # Don't rewrite files or directories
         RewriteCond %{REQUEST_FILENAME} -f [OR]
         RewriteCond %{REQUEST_FILENAME} -d
         RewriteRule ^ - [L]
 
         # Rewrite everything else to index.html
         # to allow html5 state links
         RewriteRule ^ index.html [L]
     </Directory>
 </VirtualHost>
 ```
 
 Option 2: .htaccess
 ```
 <IfModule mod_rewrite.c>
     RewriteEngine on
 
     # Don't rewrite files or directories
     RewriteCond %{REQUEST_FILENAME} -f [OR]
     RewriteCond %{REQUEST_FILENAME} -d
     RewriteRule ^ - [L]
 
     # Rewrite everything else to index.html
     # to allow html5 state links
     RewriteRule ^ index.html [L]
 </IfModule>
 ```