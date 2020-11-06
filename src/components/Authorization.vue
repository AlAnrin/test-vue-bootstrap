<template>
    <div>
        <b-alert :show="isWrong" variant="danger" dismissible>
            Неправильное имя пользователя или пароль!
        </b-alert>
        <b-card title="Авторизация" class="authorization-card" no-body variant="light">
            <b-card-header>
                Вход в систему
            </b-card-header>

            <b-card-body class="text-center">
                <b-card-text>
                    <b-form-input v-model="userName" placeholder="Логин"></b-form-input>
                    <b-form-input v-model="password" @keydown.enter.prevent = "login"
                                  type="password" placeholder="Пароль"></b-form-input>
                </b-card-text>

                <b-button variant="light" @click="login">Войти</b-button>
            </b-card-body>
        </b-card>
    </div>
</template>

<script>
    import {mapActions} from "vuex";

    export default {
        name: "Authorization",
        data() {
            return {
                userName: '',
                password: '',
                isWrong: false
            }
        },
        computed: {
            baseUrl() {
                return this.$store.state.baseUrl
            }
        },
        methods: {
            ...mapActions([
                'changeToken',
                'updateData',
                'changeFio'
            ]),
            async login() {
                let response = await fetch(`${this.baseUrl}/auth?login=${this.userName}&password=${this.password}`, {
                    method: 'POST'
                });
                let result = await response;
                if (result.status === 200) {
                    const json = await response.json();
                    this.changeToken(json.token).then(() => this.updateData());
                    this.changeFio(json.fio);
                }
                if (result.status === 404) {
                    this.isWrong = true;
                }
            }
        }
    }
</script>

<style scoped>
    input {
        margin-bottom: 2px;
    }
</style>