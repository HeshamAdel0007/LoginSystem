## LoginSystem SPA application with Multiple Authentication Guard

> Laravel v11.34.2
> NextJS v15.0.3

## About Projects

LoginSystem is a SPA application Build By Laravel & Nextjs.
use Laravel Framework to handel back-en processing.
and use Nextjs to handel client side processing.

- in this project use Multiple Authentication Guard

## Guards
<table>
    <thead>
        <th>GuardName</th>
        <th>Model</th>
        </thead>
    <tbody>
        <tr> 
            <td>admin</td>
            <td>Admin</td>
        </tr>
        <tr> 
            <td>publisher</td>
            <td>Publisher</td>
        </tr>
         <tr> 
            <td>customer</td>
            <td>Customer</td>
        </tr>
    </tbody>
</table>

## Installation

### 1. Downloade Project

Run this at the command line:

```bash
git clone git@github.com:HeshamAdel0007/Api-LoginSystem.git
```

### 2. Install Laravel

```bash
Composer install
```

- Create a New .env File

- Could Copy From Existing .env.example, Update Relevant Settings (DB_DATABASE, DB_USERNAME,.....)

- add your url front-end & back-end
  
```bash
APP_URL=your_back-end_url
FRONTEND_URL=your_front-end_url
SESSION_DOMAIN=your_back-end_url/,your_front-end_url/
SANCTUM_STATEFUL_DOMAINS=your_back-end_url/,your_front-end_url/
```

- Generate App Encryption Key

```bash
php artisan key:generate
```

- Migrate The DataBase

```bash
php artisan migrate
```

- Migrate The Seeder

```bash
php artisan db:seed
```

```bash
php artisan optimize:clear
```

### 2. Install Next Dashboard

1. go to file front-end and make this steps
   
- change file .env.example to .env
  
- in file env add your back-end url
  
```bash
BACKEND_URL=your_back-end_url
```
1. run this command

```bash
npm insatll
```
```bash
npm run dev
```

## Features

- Multiple Authentication Guard

## Users

<table>
    <thead>
        <th>User</th>
        <th>Email</th>
        <th>Password</th>
        </thead>
    <tbody>
        <tr> 
            <td>Admin</td>
            <td>admin@admin.com</td>
            <td>password</td>
        </tr>
        <tr> 
            <td>publisher</td>
            <td>publisher@publisher.com</td>
            <td>password</td>
        </tr>
         <tr> 
            <td>Customer</td>
            <td>customer@customer.com</td>
            <td>password</td>
        </tr>
    </tbody>
</table>

## Package & Tools Used

- **LaravelSanctum** v4.0.5

## Connect With Me

[<img src="https://github.com/HeshamAdel007/HeshamAdel007/blob/master/Assets/Gmail.svg" alt="Gmail logo" style="width: 25px;margin-left: 10px;margin-right: 5px;">](mailto:heshamadel528@gmail.com) [<img src="https://github.com/HeshamAdel007/HeshamAdel007/blob/master/Assets/Linkedin.svg" alt="Linkedin Logo" style="width: 25px;margin-left: 5px;margin-right: 5px;">](https://in.linkedin.com/in/heshamadel000)

</p>

## License

The Project licensed under the [MIT license](https://opensource.org/licenses/MIT).
