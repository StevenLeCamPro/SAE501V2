import { Unity, useUnityContext } from 'react-unity-webgl';
import React from 'react';

function Visite() {
  const { unityProvider } = useUnityContext({
    loaderUrl: "../UnityGame/Build/Build.loader.js",
    dataUrl: "../UnityGame/Build/Build.data",
    frameworkUrl: "../UnityGame/Build/Build.framework.js",
    codeUrl: "../UnityGame/Build/Build.wasm",
  });

  return (
    <div className="flex items-center justify-center w-full h-screen bg-orange-100 mb-32">
      <div className="bg-orange-100 flex flex-col items-center justify-center w-full h-screen">
        <Unity className="mt-64 w-full h-screen" unityProvider={unityProvider} />
      </div>
    </div>
  );
}

export default Visite;