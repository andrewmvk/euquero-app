# Eu Quero App <img style="height: 30px;" src="https://cdn-icons-png.flaticon.com/512/888/888839.png" alt="Android icons created by Pixel perfect - Flaticon"/> & <img style="height: 30px;" src="https://cdn-icons-png.flaticon.com/512/179/179309.png" alt="iOS icons created by Pixel perfect - Flaticon"/>

This is the Android version of the mobile application ["Eu Quero"](https://euquero.ufma.br), a brazilian's developed app to simplify the Basic Health Unit (BHU) in Brazil, developed with **[Expo](https://expo.dev)** and **[React Native](https://reactnative.dev)**.

<p align="center">
  <br>
  <img style="height: 90px;" alt="Eu Quero Logo" src="./assets/images/euquero-logo.png"/>
<p/>

## Why develop such an application ?
In Brazil the Health Service is public and we have a lot of BHU, but most of the people dont know about one or other BHU specificaly, like the location or the service rating (Google just rate the BHU at all, we gonna rate each one of the BHU's characteristics, we call it "scorecards"). The Eu Quero App will simplify the user location's search and rating's service preview. 

More than this, the app aims mostly to strengthening the maternal and child health care system over the first 1000 days in Brazil with more information about the quality in their local health centre through scorecards as said before. <br/>
Click [here](https://euquero.ufma.br) to see more information about the Eu Quero (in portuguese).

## Status: 🟢 Published
The APP is published in Android and iOS, you can download it by searching it's name in the AppStore or PlayStore.

## Technologies 💻
The project is developed with:

Summary: <br>
**MAIN dependecies** <br>
_Other dependecies_ (use ```yarn``` to install them)

* **[Android Studio to emulate](https://developer.android.com/studio) - 2022.1.1**
* **[Expo](https://expo.dev) - 46.0.19**
* **[NodeJS](https://nodejs.org/en/) - 16.15.1**
* **[Yarn](https://yarnpkg.com) - 1.22.19**
* _[React](https://pt-br.reactjs.org) - 18.0.0_
* _[React Native](https://reactnative.dev) - 0.69.6_
* _[React Navigation](https://reactnavigation.org) - 6.0.10_
* _[Native Permissions](https://github.com/zoontek/react-native-permissions) - 3.3.1_
* _[Native Swiper](https://www.npmjs.com/package/react-native-swiper) - 1.6.0_
* _[Native SVG Transformer](https://github.com/kristerkari/react-native-svg-transformer) - 1.0.0_
* _[Native Elements](https://reactnativeelements.com/docs/1.2.0/getting_started) - 3.4.2_
* _[Styled Components](https://styled-components.com/docs/basics) - 5.3.5_

And others... see [package.json](https://github.com/Elojr/euquero-android/blob/master/package.json) for more.

## Compile and Run 🚀
It is simple to setup this project, but you need to install [Android Studio](https://developer.android.com/studio) and the other **MAIN** dependecies said in [Technologies](https://github.com/Elojr/euquero-android#technologies-) to then be able to follow this instructions:
#### 1° - Clone this repository in the desired folder:
```shell
git clone https://github.com/Elojr/euquero-android.git
```
#### 2° - Install the dependecies:
```shell
yarn
```
#### 3° - Start the APP:
```shell
npx expo start
```
When in the terminal, choose how you want to open the APP: <br/>
<ol>
  <li><img style="height: 20px;" src="https://cdn-icons-png.flaticon.com/512/888/888839.png" alt="Android icons created by Pixel perfect - Flaticon"></img> Run <strong>Android emulator</strong> <a href="https://developer.android.com/studio">Android Studio</a> required
    <ul>
      <li>To do this you will need to press a on the terminal after the APP was started</li>
    </ul>
  </li>
  <li><img style="height: 20px;" src="https://cdn-icons-png.flaticon.com/512/179/179309.png" alt="iOS icons created by Pixel perfect - Flaticon"></img> Run <strong>iOS simulator</strong> <a href="https://developer.apple.com/xcode/">XCode</a> need <strong>(Apple devices only)</strong>
  <li>
    📲 Use the QrCode to <strong>run remotely</strong> in your device as a mobile APP <a href="https://expo.dev/client">ExpoGO App</a> required
  </li>
</ol>

## Build 🏗 (portuguese only, sorry 😥)

<em>You can build this APP by yourself if you want, but the repository does not have all the information (up to date files) required so the app works properly, these files are <strong>Top Secret</strong> 📁, so just the ELO Junior's members have them. If you realy wanna try, you need a Firebase API Key and need to configure the APP to build for the respective platform</em>

***

#### 1° Baixe os arquivos necessários da plataforma desejada e os coloque em suas respectivas pastas:
<em>Os arquivos necessários estão na <a href="https://drive.google.com/drive/folders/18Bqf2jlvbuQVDf-RRa67pAkS2-l1WqTm?usp=share_link">pasta da demanda</a> no Google Drive da ELO</em>

<ul>
  <li> Android <img style="height: 16px;" src="https://cdn-icons-png.flaticon.com/512/888/888839.png" alt="Android icons created by Pixel perfect - Flaticon" />
    <ul>
      <li>./<a href="https://drive.google.com/drive/folders/1oNviB_Bh6GmejO1rScuOAnMuv_Y7VX72?usp=share_link">android</a></li>
      <li>./<a href="https://drive.google.com/file/d/1CakbUQ36x8DsUGrXmrsAWlGkc_wjRJCf/view?usp=share_link">app.json</a></li>
      <li>./<a href="https://drive.google.com/file/d/12-q7LBLovIkUkWSUbBp_IYi5UF3nWc_d/view?usp=share_link">eas.json</a></li>
      <li>../<a href="https://drive.google.com/file/d/1H44BT7vp8aGmY6uBpz3MSL-mXcQs1m9t/view?usp=sharing">pc-api-91...de0.json</a>
    </ul>
  </li>
  <li> iOS <img style="height: 16px;" src="https://cdn-icons-png.flaticon.com/512/179/179309.png" alt="iOS icons created by Pixel perfect - Flaticon"/> 
    <ul>
      <li>./<a href="https://drive.google.com/file/d/1lCHnrobMWGfmcZxt1vyw-aFwGvEz_g-z/view?usp=share_link">app.json</a></li>
      <li>./<a href="https://drive.google.com/file/d/1_dZZq-vmKcdUU8deolYZod8_NRxi91ax/view?usp=share_link">eas.json</a></li>
    </ul>
  </li>
  <li> <strong>Ambos</strong>
    <ul>
      <li>./src/services/<a href="https://drive.google.com/file/d/1L3m1lJcXqexWCyiTr8d2sjTX5D2wgImW/view?usp=share_link">firebase.config.js</a></li>
    </ul>
  </li>
</ul>

#### 2° Faça as mudanças desejadas e incremente a versão da build:

* Em <em><strong>app.json</em></strong> e <em><strong>package.json</em></strong>, procure por <code>version</code> e <code>versionCode</code>
```javascript
"expo": {
  "some-code":"...",
  "version":"1.x.x", //<- incremente esta versão depois de qualquer mudança
  "some-code":"..."
  "android": {
    "...":"...",
    "versionCode": "x" //<- incremente esta versão depois de qualquer mudança
  }
}
```
* <img style="height: 20px;" src="https://cdn-icons-png.flaticon.com/512/888/888839.png" alt="Android icons created by Pixel perfect - Flaticon" /> Em <em><strong>root/android/app/build.gradle</strong></em>, procure por <code>versionCode</code> e <code>versionName</code>
```gradle
android {
  //...
  defaultConfig {
    //...
    versionCode 7 //<- incremente esta versão depois de qualquer mudança
    versionName "1.1.2" //<- incremente esta versão depois de qualquer mudança
  }
}
```
* <img style="height: 20px;" src="https://cdn-icons-png.flaticon.com/512/179/179309.png" alt="iOS icons created by Pixel perfect - Flaticon"/> Em <em><strong>root/ios/EuQuero/Info.plist</strong></em> procure por <code>CFBundleShortVersionString</code> e <code>CFBundleVersion</code>
```javascript
  <plist version="1.0">
    {/*...*/}
    <key>CFBundleShortVersionString</key>
    <string>1.1.2</string> //<- incremente esta versão depois de qualquer mudança
    {/*...*/}
    <key>CFBundleVersion</key>
    <string>6</string> //<- incremente esta versão depois de qualquer mudança
  </plist>
```
#### 3° Mudanças importantes:

* <img style="height: 20px;" src="https://cdn-icons-png.flaticon.com/512/888/888839.png" alt="Android icons created by Pixel perfect - Flaticon" /> O arquivo `pc-api-91...de0.json` pode ser colocado em qualquer lugar, mas será necessário modificar a localização do arquivo (URI) em eas.json (`submit.production.android.serviceAccountKeyPath`), este arquivo é importante para enviar a build ao Google, sem ele não é possível realizar uma atualização.

* <img style="height: 20px;" src="https://cdn-icons-png.flaticon.com/512/179/179309.png" alt="iOS icons created by Pixel perfect - Flaticon"/> Para o iOS é necessário refazer o arquivo `ios/`, para isso utilize o comando `npx expo prebuild` antes de tudo, isso é um comando único, só será necessário caso haja uma mudança grande de versões no APP, caso aconteça, é necessário remover a pasta e utilizar o comando novamente.

#### 4° Faça login no EAS-CLI utilizando a conta do Expo:
* <em>Utilize os dados que estão no bloco de notas dentro da <a href="https://drive.google.com/drive/folders/18Bqf2jlvbuQVDf-RRa67pAkS2-l1WqTm?usp=share_link">pasta desta demanda</a> no Google Drive da ELO.</em>
```shell
eas login
```
Para verificar o login foi realizado com sucesso:
```
eas whoami
```
#### 4° Faça o Build da aplicação e Envie:
```shell
npm install -g eas-cli
```
* Faça a build:
```shell
eas build --platform [android/ios]
```
* Envie as mudanças para a PlayStore / App Store
```shell
eas submit --platform [android/ios] --latest
```
<em>OBS.: nunca se esqueça de incrementar a versão, isso não é uma boa prática, é algo necessário para que as mudanças realmente façam efeito na build</em>

## Team - Contributors

[![Vitória_J](https://user-images.githubusercontent.com/78929443/171479037-b702cb75-7a8d-4cc6-b534-d20e3576398c.png)](https://github.com/vitoriamj)
[![Brayan_ASS](https://user-images.githubusercontent.com/78929443/171479058-ea7b88f0-b1bf-4bf1-a97e-7bce4d8898d0.png)](https://github.com/BrayanASS)
[![Andrew_M](https://user-images.githubusercontent.com/78929443/171479771-3f76b6c9-8bce-47fc-ac04-0d96bb8efbeb.png)](https://github.com/andrewmvk)
