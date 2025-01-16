<template>
  <div class="home-container">
    <!-- 左侧边栏 -->
    <div class="sidebar">
      <header class="header">
        <!-- <img class="logo" src="@/assets/logo.png" alt="logo"> -->
        <span class="logo">logo</span>
        <span class="product-name">[产品名称]</span>
      </header>
      <button class="new-chat-btn">
        <span>默认大模型</span>
        <img class="add" src="@/assets/add.svg" alt="add">
      </button>
      <div class="conversation-list">
        <div class="conversation-item" v-for="(conv, index) in conversations" :key="index">
          {{ conv }}
          <button class="delete-btn" @click="deleteConversation(index)">
            <img class="trash-icon" src="@/assets/delete.svg" alt="delete">
          </button>
        </div>
      </div>
      <div class="user">
        <div class="user-info">
          <div class="user-img"></div>
          <div class="user-name">{{ username }}</div>
        </div>
        <SettingIcon class="user-setting" />
      </div>
    </div>

    <!-- 主内容区 -->
    <div class="main-area">
      <div class="main-content">
        <div class="welcome-section">
          <h1><WelcomIcon class="icon"/>欢迎使用[产品名称]</h1>
          <p class="subtitle">可以点击下方的服务进行提问～</p>
        </div>

        <div class="services-grid">
          <div class="service-card" v-for="(service, index) in services" :key="index">
            <AnalyseIcon class="service-icon"/>
            <div class="service-content">
              <h3>{{ service.title }}</h3>
              <p>{{ service.description }}</p>
            </div>
          </div>
        </div>
      </div>

      <div class="input-section">
        <div class="input-container">
          <UploadIcon class="attachment-btn" />
          <input 
            type="text" 
            placeholder="可以在这里向我提问"
            v-model="userInput"
            @keyup.enter="sendMessage"
          >
          <SendIcon class="send-btn" @click="sendMessage" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import WelcomIcon from '../components/icons/IconWelcom.vue';
import AnalyseIcon from '../components/icons/IconAnalyse.vue';
import UploadIcon from '../components/icons/IconUpload.vue';
import SendIcon from '../components/icons/IconSend.vue';
import SettingIcon from '../components/icons/IconSetting.vue';

const userInput = ref('');
const conversations = ref(['新对话1', '新对话2', '新对话3', '新对话4']);
const username = ref('[用户昵称]');
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
])

const sendMessage = () => {
  if (userInput.value.trim()) {
    // 处理发送消息的逻辑
    userInput.value = ''
  }
}

const deleteConversation = (index: number) => {
  conversations.value.splice(index, 1)
}
</script>

<style scoped lang="less">
.home-container {
  display: flex;
  height: 100vh;
  background-color: #f5f5f5;
}

/* 左侧边栏样式 */
.sidebar {
  width: 280px;
  background: #F7F7FA;
  padding: 14px 12px 12px 12px;
  display: flex;
  flex-direction: column;
  position: relative;
  
  .header {
    height: 22px;
    line-height: 22px;
    .logo {
      width: 24px;
      text-align: center;
      background: #D9D9D9;
      display: inline-block;
      margin-right: 8px;
      font-size: 10px;
    }

    .product-name {
      font-weight: 600;
      font-size: 14px;
      color: #102953;
      line-height: 22px;
    }
  }

  .new-chat-btn {
    display: flex;
    padding: 9px 11px 9px 32px;
    color: #fff;
    justify-content: space-between;
    cursor: pointer;
    width: 100%;
    margin-top: 37px;
    margin-bottom: 72px;
    background: radial-gradient(243.39% 214.86% at 1.95% 15%, #7751FE 0%, #F6F1FA 100%);
    border-radius: 8px;
    border: none;
  }

  .conversation-list {
    display: flex;
    flex-direction: column;
    gap: 8px;
    overflow-y: auto;

    .conversation-item {
      padding: 9px 12px 9px 32px;
      font-weight: 400;
      font-size: 14px;
      line-height: 22px;
      border-radius: 8px;
      color: rgba(0,0,0,0.45);
      display: flex;
      justify-content: space-between;
      align-items: center;
      cursor: pointer;

      &:hover {
        background: rgba(0,0,0,0.04);
        color: #000;
        .delete-btn {
          opacity: 1;
        }
      }

      .delete-btn {
        background: none;
        border: none;
        cursor: pointer;
        opacity: 0;
        padding: 4px;
        border-radius: 4px;

        &:hover {
          opacity: 1 !important;
          background: #e8e8e8;
        }
      }
    }
  }

  .user {
    display: flex;
    justify-content: space-between;
    position: absolute;
    bottom: 12px;
    border-top: 1px solid rgba(0, 0, 0, 0.06);
    width: calc(100% - 24px);
    position: absolute;
    padding-top: 8px;
    align-items: center;
    .user-info {
      display: flex;
      .user-img {
        width: 24px;
        height: 24px;
        border-radius: 100%;
        background: #eee;
        margin-right: 8px;
      }

      .user-name {
        font-size: 12px;
        color: rgba(0, 0, 0, 0.65);
        line-height: 24px;
      }
    }
    .user-setting {
      cursor: pointer;
    }
  }
}

/* 主内容区样式 */
.main-area {
  flex: 1;
  display: flex;
  flex-direction: column;
  width: calc(100% - 280px);
  background: #fff;
  padding: 56px 152px 24px 156px;

  .header {
    padding: 16px 0;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .main-content {
    flex: 1;
    padding: 20px 0;
    overflow-y: auto;
    width: 856px;
    margin: 0 auto;

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
            color: rgba(0,0,0,0.45);
          }
        }
      }
    }
  }

  .input-section {
    padding: 16px;
    background: white;
    position: sticky;
    bottom: 0;
    width: 856px;
    margin: 0 auto;

    .input-container {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 8px;
      border-radius: 12px;
      box-shadow: 0px 0px 13px 0px rgba(191,205,237,0.2);
      border: 1px solid #6A43FF;

      input {
        flex: 1;
        font-size: 16px;
        line-height: 20px;
        border: none;
        outline: none;
      }

      .attachment-btn, .send-btn {
        cursor: pointer;
      }
    }
  }
}
</style>
