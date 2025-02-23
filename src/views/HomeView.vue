<template>
  <div class="home-container">
    <!-- 左侧边栏 -->
    <SideBar />
    <!-- 主内容区 -->
    <div class="main-area">
      <div class="main-content">
        <div class="welcome-section">
          <h1>
            <WelcomIcon class="icon" />欢迎使用[法律文书]
          </h1>
          <p class="subtitle">可以点击下方的服务进行提问～</p>
        </div>

        <div class="services-grid">
          <div class="service-card" v-for="(service, index) in services" :key="index">
            <AnalyseIcon class="service-icon" />
            <div class="service-content">
              <h3>{{ service.title }}</h3>
              <p>{{ service.description }}</p>
            </div>
          </div>
        </div>

        <div class="conversation-list">
          <div class="conversation-item" :class="conv.role === 'user' ? 'user' : 'system'"
            v-for="(conv, index) in conversations" :key="index">
            <div v-if="conv.role === 'user' && conv.type === 'text'" class="conversation-item-content">{{ conv.content
            }}</div>
            <div v-if="conv.role === 'system'">
              <span class="icon">logo</span>
              <span class="conversation-item-content">{{ conv.content }}</span>
            </div>
            <div v-if="conv.role === 'user' && conv.type === 'file'" class="conversation-item-content file-list">
              <div class="file-icon">
                <FileIcon />
              </div>
              <div class="file-info">
                <div class="file-name">{{ conv.content }}</div>
                <div class="file-size">{{ conv.size }}</div>
              </div>
            </div>
          </div>
        </div>

        <div :class="['input-section', { 'show-upload': isShowUpload || uploadFiles.length }]">
          <div class="upload-section" v-if="isShowUpload">
            <p class="upload-title">文件上传</p>
            <div class="upload-main">
              <p class="upload-tip">拖放文件到此处</p>
              <p class="upload-support">支持上传文件,接受pdf、doc、xlsx、ppt、txt、图片等</p>
              <p class="upload-tip">或者选择</p>
              <input type="file" class="upload-btn" @change="handleFileUpload" />
            </div>
          </div>
          <div class="file-list" v-if="uploadFiles.length">
            <div class="file-item" v-for="(fileItem, index) in uploadFiles" :key="index">
              <div class="file-icon">
                <FileIcon />
              </div>
              <div class="file-info">
                <div class="file-name">{{ fileItem.name }}</div>
                <div class="file-size">{{ fileItem.size }}</div>
              </div>
            </div>
          </div>
          <div :class="['input-container', { 'has-value': userInput }]">
            <UploadIcon class="attachment-btn" @click="showUpload()" />
            <input type="text" placeholder="可以在这里向我提问" v-model="userInput" @keyup.enter="sendMessage" />
            <SendIconDefault v-if="!userInput" class="send-btn" />
            <SendIcon v-if="userInput" class="send-btn" @click="sendMessage" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import axios from 'axios';
import WelcomIcon from '../components/icons/IconWelcom.vue';
import AnalyseIcon from '../components/icons/IconAnalyse.vue';
import UploadIcon from '../components/icons/IconUpload.vue';
import SendIcon from '../components/icons/IconSend.vue';
import SendIconDefault from '../components/icons/IconSendDefault.vue';
import FileIcon from '../components/icons/IconFile.vue';
import SideBar from '../components/SideBar.vue';
import type { Conversation, UploadFiles } from '../types/conversation';

const baseurl = 'http://jr21lr87973.vicp.fun/api/chat';

const userInput = ref('');
const isShowUpload = ref(false);
const services = ref([
  {
    title: '分析法律文件',
    description: '快速添加你想要进行分析的文件'
  },
  {
    title: '分析法律文件',
    description: '快速添加你想要进行分析的文件'
  },
  {
    title: '分析法律文件',
    description: '快速添加你想要进行分析的文件'
  },
  {
    title: '分析法律文件',
    description: '快速添加你想要进行分析的文件'
  }
]);

const conversations = ref<Conversation[]>([]);

const uploadFiles = ref<UploadFiles[]>([]);

const fileid = ref('');

const showUpload = () => {
  isShowUpload.value = true;
};

const handleFileUpload = (event: Event) => {
  // uploadFiles.value.push({
  //   name: "1223.pdf",
  //   size: "200kb",
  // });
  // isShowUpload.value = false;
  // return;
  const input = event.target as HTMLInputElement;
  if (input.files && input.files.length > 0) {
    const file = input.files[0];
    console.log('Selected file:', file);
    // 处理文件上传逻辑
    const data = new FormData();
    data.append('file', file);
    axios.post('/api/api/files/validate-upload', data).then((res: any) => {
      console.log(res);
      if (res.data.code !== 200) {
        return;
      }

      uploadFiles.value.push({
        name: res.data.files[0].fileName,
        size: "200kb",
      });

      fileid.value = res.data.files[0].id;
      console.log(res.data.files[0])
      isShowUpload.value = false;
    });
  }
}

const sendMessage = () => {
  // conversations.value.push({
  //   content: "简述法律的基本原则有哪些？",
  //   role: 'user',
  //   type: 'file',
  //   size: '200kb',
  // });
  // conversations.value.push({
  //   content: "法律的基本原则包括公平、公正、公开、平等保护等。",
  //   role: 'system',
  //   type: 'text',
  //   size: '200kb',
  // });
  // return;
  if(uploadFiles.value.length > 0) {
    const newItem: Conversation = {
      content: uploadFiles.value[0].name,
      role: 'user',
      type: 'file',
      size: '200kb',
    };
    conversations.value.push(newItem);
    uploadFiles.value = [];
  }

  if (userInput.value.trim()) {
    const newItem: Conversation = {
      content: userInput.value,
      role: 'user',
      type: 'text',
      size: '200kb',
    };
    conversations.value.push(newItem);
    fetchData(userInput.value , fileid.value);
    // 处理发送消息的逻辑
    userInput.value = '';
  }
};

const fetchData = async (sendmsg: string, fileId: string) => {
  const data = {
    "authType": "API_KEY",
    "credential": "c876d531-9497-4d8b-9218-168b1a3d8a67",
    "modelId": "ep-20241211211452-jwxkm",
    "dialogId": "80a1e40fadaa42d7ac55",
    "content": sendmsg,
    "fileIds":[fileId]
  }
  const res = await axios.post(`/api/api/chat`, data);
  console.log(res);
  if (res.data.code !== 200) {
    return;
  }
  const newItem: Conversation = {
    content: res.data.response,
    role: 'system',
    type: 'text',
    size: '200kb',
  };
  conversations.value.push(newItem);
  fileid.value = '';
};

watch(userInput, (newValue) => {
  const inputContainer = document.querySelector('.input-container');
  if (inputContainer) {
    if (newValue) {
      inputContainer.classList.add('has-value');
    } else {
      inputContainer.classList.remove('has-value');
    }
  }
});

</script>

<style scoped lang="less">
.home-container {
  display: flex;
  height: 100vh;
  background-color: #f5f5f5;
}

/* 主内容区样式 */
.main-area {
  flex: 1;
  display: flex;
  flex-direction: column;
  width: calc(100% - 280px);
  background: #fff;
  padding: 56px 10.5vw 24px 10.5vw;
  overflow-y: auto;

  .main-content {
    flex: 1;
    padding: 20px 0;
    width: 100%;
    margin: 0 auto;
    position: relative;

    .welcome-section {
      margin-bottom: 16px;

      h1 {
        font-weight: 600;
        font-size: 28px;
        color: #000000;
        line-height: 40px;

        .icon {
          vertical-align: sub;
          margin-right: 8px;
        }
      }

      .subtitle {
        font-size: 16px;
        color: rgba(0, 0, 0, 0.65);
        line-height: 22px;
        margin-top: 8px;
      }
    }

    .services-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 8px;
      margin-bottom: 32px;

      .service-card {
        background: white;
        padding: 16px;
        display: flex;
        gap: 8px;
        cursor: pointer;
        border-radius: 12px;
        border: 1px solid rgba(0, 0, 0, 0.1);

        .service-icon {
          font-size: 24px;
        }

        .service-content {
          h3 {
            margin: 0;
            font-weight: 600;
            font-size: 14px;
            color: #000000;
            line-height: 20px;
          }

          p {
            margin: 4px 0 0;
            font-size: 14px;
            font-weight: 300;
            font-size: 14px;
            line-height: 20px;
            color: rgba(0, 0, 0, 0.45);
          }
        }
      }
    }

    .conversation-list {
      .conversation-item {
        display: flex;
        justify-content: flex-end;

        &.system {
          justify-content: flex-start;
        }

        .icon {
          width: 24px;
          height: 24px;
          background: #D9D9D9;
          display: inline-block;
          font-size: 10px;
          color: #000000;
          line-height: 22px;
          padding: 2px;
          margin-right: 10px;
          vertical-align: text-bottom;
        }

        .conversation-item-content {
          min-width: 228px;
          background: #F7F7F7;
          border-radius: 12px;
          padding: 13px 16px;
          font-size: 14px;
          line-height: 20px;
          margin-bottom: 40px;
          display: inline-block;

          &.file-list {
            border-bottom: 1px solid rgba(0, 10, 26, 0.07);
            padding: 8px 16px;
            display: flex;
            // height: 160px;
            // overflow-y: auto;

            .file-item {
              display: flex;
              width: 240px;
              height: 66px;
              background: #F5F5F5;
              border-radius: 12px;
              padding: 12px;
              overflow-y: auto;
              .file-icon {
                margin-right: 3px;
              }

              .file-info {
                .file-name {
                  font-weight: 400;
                  font-size: 14px;
                  line-height: 20px;
                }

                .file-size {
                  font-size: 12px;
                  color: rgba(0, 0, 0, 0.45);
                  height: 17px;
                  margin-top: 4px;
                }
              }
            }
          }
        }
      }
    }
  }

  .input-section {
    padding: 16px 0 0 0;
    background: white;
    position: absolute;
    bottom: 0;
    width: 100%;
    margin: 0 auto;

    &.show-upload {
      box-shadow: 0px 0px 13px 0px rgba(191, 205, 237, 0.2);
      border: 1px solid rgba(0, 10, 26, 0.07);
      border-radius: 12px;
      padding: 0;

      .upload-section {
        border-bottom: 1px solid rgba(0, 10, 26, 0.07);

        .upload-title {
          background: rgba(0, 0, 0, 0.02);
          padding: 11px 16px;
          font-weight: 500;
          font-size: 14px;
          color: rgba(0, 0, 0, 0.88);
          line-height: 16px;
        }

        .upload-main {
          text-align: center;
          padding: 24px 0;

          .upload-tip {
            font-weight: 500;
            font-size: 14px;
            line-height: 16px;
          }

          .upload-support {
            font-weight: 300;
            font-size: 14px;
            color: rgba(0, 0, 0, 0.45);
            line-height: 16px;
            padding: 8px 0;
          }

          .upload-btn {
            margin-top: 8px;
            background: #6A43FF;
            color: #fff;
            border-radius: 39px;
            width: 96px;
            text-align: center;
            display: inline-block;
            padding: 8px 16px;
            font-size: 16px;
            line-height: 22px;
            cursor: pointer;
            background: none;
            font: inherit;
          }
        }
      }

      .file-list {
        border-bottom: 1px solid rgba(0, 10, 26, 0.07);
        padding: 8px 16px;
        display: flex;
        height: 160px;
        overflow-y: auto;

        .file-item {
          display: flex;
          width: 240px;
          height: 66px;
          background: #F5F5F5;
          border-radius: 12px;
          padding: 12px;

          .file-icon {
            margin-right: 3px;
          }

          .file-info {
            .file-name {
              font-weight: 400;
              font-size: 14px;
              line-height: 20px;
            }

            .file-size {
              font-size: 12px;
              color: rgba(0, 0, 0, 0.45);
              height: 17px;
              margin-top: 4px;
            }
          }
        }
      }

      .input-container {
        border-radius: 0;
        border: none;
        box-shadow: none;
        ;
      }
    }

    .input-container {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 8px;
      border-radius: 12px;
      box-shadow: 0px 0px 13px 0px rgba(191, 205, 237, 0.2);
      border: 1px solid rgba(0, 10, 26, 0.07);

      &.has-value {
        border-color: #6A43FF;
      }

      input {
        flex: 1;
        font-size: 16px;
        line-height: 20px;
        border: none;
        outline: none;
      }

      .attachment-btn,
      .send-btn {
        cursor: pointer;
      }
    }
  }
}
</style>
