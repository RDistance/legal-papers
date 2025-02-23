<template>
    <div class="sidebar">
        <header class="header">
            <!-- <img class="logo" src="@/assets/logo.png" alt="logo"> -->
            <span class="logo">logo</span>
            <span class="product-name">[法律文书]</span>
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
                <div class="user-img">未登陆</div>
                <div class="user-name">{{ username }}</div>
            </div>
            <SettingIcon class="user-setting" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import SettingIcon from '../components/icons/IconSetting.vue';

const conversations = ref(['新对话1', '新对话2', '新对话3', '新对话4']);
const username = ref('[请登陆]');

const deleteConversation = (index: number) => {
    conversations.value.splice(index, 1);
};
</script>

<style scoped lang="less">
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
            color: rgba(0, 0, 0, 0.45);
            display: flex;
            justify-content: space-between;
            align-items: center;
            cursor: pointer;

            &:hover {
                background: rgba(0, 0, 0, 0.04);
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
            cursor: pointer;

            .user-img {
                width: 24px;
                height: 24px;
                border-radius: 100%;
                background: #6A43FF;
                margin-right: 8px;
                font-size: 6px;
                line-height: 24px;
                color: #fff;
                text-align: center;
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
</style>
