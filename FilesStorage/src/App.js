import { useEffect, useState } from "react";
import { initJuno, uploadFile, listAssets, deleteAsset } from "@junobuild/core";

function App() {
  useEffect(() => {
    (async () => {
      await initJuno({
        satelliteId: "oio3g-riaaa-aaaal-acfva-cai",
      });
      await list();
    })();
  }, []);

  const [file, setFile] = useState();
  const [assets, setAssets] = useState([]);

  const list = async () => {
    const { assets } = await listAssets({
      collection: "PDF",
      filter: {},
    });
    console.log(assets);
    setAssets(assets);
  };

  const upload = async () => {
     await uploadFile({
      collection: "PDF",
      data: file,
      filename: file.name,
    });
    alert("文件已上传");
    setFile(null);
    await list();
  };

  const deleteAssetByPath = async (SingleAsset) => {
    await deleteAsset({
      collection: "PDF",
      storageFile: SingleAsset,
    });
    alert("文件已删除");
    await list();
  };

  return (
    <>
      <input
        type="file"
        accept="application/pdf"
        onChange={(event) => setFile(event.target.files?.[0])}
      />
  
      <button type="button" onClick={upload}>
        上传文件
      </button>

      <button type="button" onClick={list}>
        列出所有文件
      </button>
  
      {assets.length === 0 ? (
        <div>文件库里还没有文件</div>
      ) : (
        <div>你的文件库有 {assets.length} 件文件:
        <ul>
          {assets.map((SingleAsset) => (
            <li key={SingleAsset.fullpath}>
              <a href={SingleAsset.downloadUrl} target="_blank" rel="noopener noreferrer">
                {SingleAsset.name}
              </a>
              <button type="button" onClick={() => deleteAssetByPath(SingleAsset)}>
                删除
              </button>
            </li>
          ))}
        </ul>
        </div>
      )}
    </>
  );
}

export default App;