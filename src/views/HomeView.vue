<template>
  <div class="home-container">
    <!-- 左侧边栏 -->
    <div class="sidebar">
      <button class="new-chat-btn">
        <span>➕</span>
        默认大模型
      </button>
      <div class="conversation-list">
        <div class="conversation-item" v-for="(conv, index) in conversations" :key="index">
          {{ conv }}
          <button class="delete-btn" @click="deleteConversation(index)">
            <span class="trash-icon">🗑</span>
          </button>
        </div>
      </div>
    </div>

    <!-- 主内容区 -->
    <div class="main-area">
      <header class="header">
        <!-- <img class="logo" src="@/assets/logo.png" alt="logo"> -->
        <!-- <span class="product-name">[产品名称]</span> -->
      </header>

      <div class="main-content">
        <div class="welcome-section">
          <h1>👋 欢迎使用[产品名称]</h1>
          <p class="subtitle">可以点击下方的服务进行提问～</p>
        </div>

        <div class="services-grid">
          <div class="service-card" v-for="(service, index) in services" :key="index">
            <div class="service-icon">📄</div>
            <div class="service-content">
              <h3>{{ service.title }}</h3>
              <p>{{ service.description }}</p>
            </div>
          </div>
        </div>
      </div>

      <div class="input-section">
        <div class="input-container">
          <button class="attachment-btn">📎</button>
          <input 
            type="text" 
            placeholder="可以在这里向我提问"
            v-model="userInput"
            @keyup.enter="sendMessage"
          >
          <button class="send-btn" @click="sendMessage">↑</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const userInput = ref('')
const conversations = ref(['新对话1', '新对话2', '新对话3', '新对话4'])
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
  padding: 16px;
  display: flex;
  flex-direction: column;
  border-right: 1px solid #eee;

  .new-chat-btn {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 16px;
    background: #f5f5f5;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    width: 100%;
    margin-bottom: 16px;

    &:hover {
      background: #e8e8e8;
    }
  }

  .conversation-list {
    display: flex;
    flex-direction: column;
    gap: 8px;
    overflow-y: auto;

    .conversation-item {
      padding: 8px 12px;
      border-radius: 8px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      cursor: pointer;

      &:hover {
        background: #f5f5f5;

        .delete-btn {
          opacity: 0.6;
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

    .welcome-section {
      margin-bottom: 32px;

      h1 {
        font-size: 24px;
        margin-bottom: 8px;
      }

      .subtitle {
        color: #666;
      }
    }

    .services-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 16px;
      margin-bottom: 32px;

      .service-card {
        background: white;
        padding: 16px;
        border-radius: 8px;
        display: flex;
        align-items: center;
        gap: 12px;
        cursor: pointer;

        .service-icon {
          font-size: 24px;
        }

        .service-content {
          h3 {
            margin: 0;
            font-size: 16px;
          }

          p {
            margin: 4px 0 0;
            font-size: 14px;
            color: #666;
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

    .input-container {
      display: flex;
      align-items: center;
      gap: 8px;
      background: #f5f5f5;
      padding: 8px;
      border-radius: 24px;

      input {
        flex: 1;
        border: none;
        background: none;
        padding: 8px;
        outline: none;
      }

      .attachment-btn, .send-btn {
        background: none;
        border: none;
        cursor: pointer;
        padding: 8px;
        border-radius: 50%;

        &:hover {
          background: #e0e0e0;
        }
      }
    }
  }
}
</style>
