<template>
  <div class="home-container">
    <!-- 左侧边栏 -->
    <SideBar />
    <!-- 主内容区 -->
    <div class="main-area">
      <div class="main-content">
        <div class="welcome-section">
          <h1>
            <WelcomIcon class="icon" />欢迎使用[产品名称]
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
          <div class="conversation-item" v-for="(conv, index) in conversations" :key="index">
            <div class="conversation-item-content">{{ conv }}</div>
          </div>
        </div>
      </div>

      <div class="input-section">
        <div :class="['input-container', { 'has-value': userInput }]">
          <UploadIcon class="attachment-btn" />
          <input type="text" placeholder="可以在这里向我提问" v-model="userInput" @keyup.enter="sendMessage" />
          <SendIcon class="send-btn" @click="sendMessage" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import WelcomIcon from '../components/icons/IconWelcom.vue';
import AnalyseIcon from '../components/icons/IconAnalyse.vue';
import UploadIcon from '../components/icons/IconUpload.vue';
import SendIcon from '../components/icons/IconSend.vue';
import SideBar from '../components/SideBar.vue';

const userInput = ref('');
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

const conversations = ref(['新对话1', '新对话2', '新对话3', '新对话4']);

const sendMessage = () => {
  if (userInput.value.trim()) {
    conversations.value.push(userInput.value);
    // 处理发送消息的逻辑
    userInput.value = '';
  }
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

  .header {
    padding: 16px 0;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .main-content {
    flex: 1;
    padding: 20px 0;
    width: 100%;
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
            color: rgba(0, 0, 0, 0.45);
          }
        }
      }
    }

    .conversation-list {
      .conversation-item {
        display: flex;
        justify-content: flex-end;

        .conversation-item-content {
          min-width: 228px;
          background: #F7F7F7;
          border-radius: 12px;
          padding: 13px 16px;
          font-size: 14px;
          line-height: 20px;
          margin-bottom: 40px;
        }
      }
    }
  }

  .input-section {
    padding: 16px 0;
    background: white;
    position: sticky;
    bottom: 0;
    width: 100%;
    margin: 0 auto;

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
