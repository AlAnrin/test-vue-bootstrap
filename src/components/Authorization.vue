<template>
    <div>
        <b-card title="Авторизация" no-body variant="light">
            <b-card-header>

            </b-card-header>

            <b-card-body class="text-center">
                <b-card-text>
                    <b-form-input v-model="userName" placeholder="Логин"></b-form-input>
                    <b-form-input v-model="password" type="password" placeholder="Пароль"></b-form-input>
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
                password: ''
            }
        },
        computed: {
            baseUrl() {
                return this.$store.state.baseUrl
            }
        },
        methods: {
            ...mapActions([
                'changeToken'
            ]),
            async login() {
                let response = await fetch(`${this.baseUrl}/auth?login=${this.userName}&password=${this.password}`, {
                    method: 'POST'
                });
                let result = await response.json();
                this.changeToken(result.token);
                console.log(result.token)
            }
        }
    }
</script>

<style scoped>

</style>