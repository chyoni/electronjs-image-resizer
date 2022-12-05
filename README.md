# Image Resizer with Electron

### #01 electronmon

-nodemon과 동일

```bash
npx electronmon .
```

### #02 TailwindCSS + Electron

```bash
1. npm install -D tailwindcss
2. npx tailwindcss init

위 명령어를 입력하면, tailwind.config.js 파일이 생성되고 해당 파일에서 
content에 tailwind를 사용할 파일 경로를 입력

3.원하는 경로에 css파일을 생성한 후 해당 파일에 아래와 같이 입력

@tailwind base;
@tailwind components;
@tailwind utilities;

4. npx tailwindcss -i ./globals.css -o ./renderer/css/styles.css --watch
입력하면 만든 css 파일을 가지고 renderer/css/styles.css 파일을 생성하는데 그 파일을 html 파일에서
head에 link로 로드하면 됨

이렇게 하면 일단 watch 옵션을 줬기 때문에, JIT Compiler를 사용하여 새로 만들어지는 tailwind className이
있을때마다 저 파일에 추가가 되는데 dev 환경에서는 이렇게 하면 되고 배포시에는 만든 파일을 가지고 그냥 link를 해주면 될 거 같다.
```

### #03 Preload script

```bash 
Electron에서는 Node Module 관련해서 renderer에서 사용이 불가하므로 renderer에서 어떤 node module을 사용하기 위해서는 preload script를 사용해야 한다.
```