import {Unity, useUnityContext} from 'react-unity-webgl';
import React from 'react';

function Visite() {

    const { unityProvider } = useUnityContext({
        loaderUrl: "../UnityGame/Build/Build.loader.js",
        dataUrl: "../UnityGame/Build/Build.data",
        frameworkUrl: "../UnityGame/Build/Build.framework.js",
        codeUrl: "../UnityGame/Build/Build.wasm",
      });
    
      return <Unity className='w-full h-screen' unityProvider={unityProvider} />;
}

export default Visite;