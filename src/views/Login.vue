<template>
    <v-app id="inspire">
        <v-content>
            <v-container fluid fill-height>
                <v-layout align-center justify-center>
                    <v-flex xs12 sm8 md4>
                        <v-card class="elevation-12">
                            <v-toolbar dark color="primary">
                                <v-toolbar-title>Login form</v-toolbar-title>
                            </v-toolbar>
                            <v-card-text>
                                <v-form v-model="valid">
                                    <v-text-field v-model="credientials.login"
                                                  :rules="[required('validator.login.required')]"
                                                  prepend-icon="person" name="login" :label="$t('login.login')" type="text"></v-text-field>
                                    <v-text-field v-model="credientials.password"
                                                  :type="showPassword ? 'text' : 'password'"
                                                  @click:append="showPassword = !showPassword   "
                                                  :append-icon="showPassword ? 'visibility' : 'visibility_off'"
                                                  :rules="[required('validator.password.required')]"
                                                  id="password" prepend-icon="lock" name="password" :label="$t('login.password')"></v-text-field>
                                </v-form>
                            </v-card-text>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn
                                        :loading="loading"
                                        :disabled="loading || !valid"
                                        color="primary" @click="onLogin()">{{$t('login.validate')}}</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-content>
    </v-app>
</template>

<script lang="ts">
    import Component from 'vue-class-component';
    import {Credentials} from '@/generated';
    import {Logger} from '@/utils/logger';
    import {Mixins, Watch} from 'vue-property-decorator';
    import Validators from '@/utils/validators';
    import {Getter} from 'vuex-class';

    @Component
    export default class Login extends Mixins(Validators) {
        @Getter public userToken!: string;

        private credientials: Credentials = {login: '', password: ''};
        private valid = false;
        private loading = false;
        private error: any;
        private redirect = null;
        private showPassword = false;

        private onLogin() {
            this.loading = true;
            this.$store.dispatch('Login', this.credientials).then(() => {
                this.$router.push({path: this.redirect || '/home'});
                this.loading = false;
            }).catch((error: any) => {
                this.loading = false;
                Logger.error(error);
            });
        }

        @Watch('$route', { immediate: true, deep: true })
        private watchRoute(route: any) {
            this.redirect = route.query && route.query.redirect;
        }

    }
</script>
