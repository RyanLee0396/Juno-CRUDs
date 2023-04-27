import { initJuno, setDoc, listDocs, getDoc,delDoc } from "@junobuild/core";
import { nanoid } from "nanoid";
import { useEffect, useState } from "react";
import "./App.css";

function App() {
//初始化
  useEffect(() => {
    (async () =>
      await initJuno({
        satelliteId: "oio3g-riaaa-aaaal-acfva-cai",//换成自己的卫星Id
      }))();
  }, []);


//加入新的联系人
  const [inputText, setInputText] = useState("");
  const [phone, setPhone] = useState("");
  const add = async () => {
    await setDoc({
      
      collection: "contacts",
      doc: {
        key: nanoid(),
        data: {
          Name: inputText,
          Phone: phone,
        },
      },
    });
    setInputText("");
    setPhone("");
    alert("新增了一个联系人");
  };

  const [inputKey, setinputKey] = useState("");
  const [docgot, setDocgot] = useState("");
  const [timestamp, setTimestamp] = useState("");
  const [timestring, setTimestring] = useState("");
  const [CreatedTime, setCreatedTime] = useState("");

  
  //日期格式
  const options = {
		month: 'short',
		day: 'numeric',
		year: 'numeric',
		hour: '2-digit',
		minute: '2-digit',
		hour12: false
	};
  //获取单一联系人资料
  const get = async () => {
    const doc = await getDoc({
      collection: "contacts",
      key: inputKey,
    });
    setDocgot(doc.data);
    const updatedTime = doc.updated_at;
    const createdTime = doc.created_at;
    setTimestamp(updatedTime);
    const date = new Date(Number(updatedTime / 1_000_000n));
    const date2 = new Date(Number(createdTime / 1_000_000n));
    setTimestring(date.toLocaleString('en-US', options) + "  \n以纳秒计时: " + updatedTime.toString());
    
    setCreatedTime(date2.toLocaleString('en-US', options));
    setinputKey("");
  };

  //更新单一联系人资讯/联系人格式
 const [upDatePhone, setupDatePhone] = useState("");
  const updatedoc = async () => {
    await setDoc({
      collection: "contacts",
      doc: {
        key: inputKey,
        updated_at: timestamp,
        data: {
          Name: docgot.Name,
          Phone: upDatePhone,
        }
      },
    });
    setupDatePhone("");
    setinputKey("");
    alert("ID为 "+inputKey+" 的电话号码已被更新");
    list();
  };

  //列出所有联系人
  const [items, setItems] = useState([]);
  const list = async () => {
    const { items } = await listDocs({
      collection: "contacts",
      filter: {
        order:{
          desc: true,
          field:"updated_at",
        }
      },
    });
    setItems(items);
  };

 //删除联系人
const [deleteKey, setdeleteKey] = useState("");
const deleteDoc = async () => {
  await delDoc({
    collection: "contacts",
    doc: {
    key: deleteKey,
    updated_at: timestamp,
    },
  });
alert("ID为 "+deleteKey+" 的文档已被删除");
setdeleteKey("");
list();
};

 
return (
  <div className="App">
    <header className="App-header">
      <h1>电话簿</h1>
      <textarea value={inputText} onChange={(e) => setInputText(e.target.value)} placeholder="联系人名称"/>
      <textarea value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="电话号码"/>
      <button onClick={add}>新增</button>

      <textarea
        value={inputKey}
        onChange={(e) => setinputKey(e.target.value)}
        placeholder="输入联系人ID以查询详情"
      />

      <textarea
        value={upDatePhone}
        onChange={(e) => setupDatePhone(e.target.value)}
        placeholder="输入新的电话号码以更新"
      />
      
      <button onClick={get}>获取资料</button>
      <button onClick={updatedoc}>更新资料</button>

      <textarea
        value={deleteKey}
        onChange={(e) => setdeleteKey(e.target.value)}
        placeholder="输入想要删除的联系人ID"
      />
      <button onClick={deleteDoc}>删除</button>

  <div id="getarea">
  <p>名称: {docgot.Name}</p>
  <p>电话号码: {docgot.Phone}</p>
  <p>上一次更新时间: {timestring}</p>
  <p>创建时间: {CreatedTime}</p>
</div>

<button onClick={list}>列出所有联系人</button>
      <div id="listarea">
        {items.map(({ key, data: { Name,Phone } }) => (
          <div key={key}>
            <p>名称: {Name}</p>
            <p>电话号码: {Phone}</p>
            <p>ID: {key}</p>
          </div>
        ))}
      </div>

     
    </header>
  </div>
);
}

export default App;