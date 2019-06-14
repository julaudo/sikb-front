<template>
    <div>
        <v-navigation-drawer ref="navDrawer" fixed
                             v-model="drawer"
                             app
                             :clipped="true"
                             width="350">
            <v-list-tile
                    v-if="isMobile()"
                    key="Close"
                    @click="drawer = !drawer">
                <v-list-tile-content :style="{'align-items':'flex-end'}">
                    <v-icon>close</v-icon>
                </v-list-tile-content>
            </v-list-tile>

            <v-list class="pt-0">
                <template v-for="item in items">
                    <template v-if="item.children">
                        <v-list-group
                                      :key="item.name"
                                      :prepend-icon="item.meta.icon"
                                      value="true">
                            <template v-slot:activator :prepend-icon="item.meta.icon">
                                <v-list-tile>
                                    <v-list-tile-content>
                                        <v-list-tile-title>{{ getMenuName(item) }}</v-list-tile-title>
                                    </v-list-tile-content>
                                </v-list-tile>
                            </template>
                            <v-list-tile
                                    v-for="child in getChildren(item)"
                                    :key="child.name"

                                    :to="item.path + '/' + child.path"
                                    @click=""
                            >
                                <v-list-tile-action>
                                    <v-icon>{{child.icon}}</v-icon>
                                </v-list-tile-action>
                                <v-list-tile-title>{{ getMenuName(child) }}</v-list-tile-title>
                            </v-list-tile>
                        </v-list-group>
                    </template>
                    <template v-else>
                        <v-list-tile
                                :key="item.name"
                                :to="item.path"
                                @click=""
                        >
                            <v-list-tile-action>
                                <v-icon>{{item.meta.icon}}</v-icon>
                            </v-list-tile-action>
                            <v-list-tile-title>{{ getMenuName(item) }}</v-list-tile-title>
                        </v-list-tile>
                    </template>
                </template>
                <v-list-tile
                        :key="'Logout'"
                        @click="logout()"
                >
                    <v-list-tile-action>
                        <v-icon>close</v-icon>
                    </v-list-tile-action>

                    <v-list-tile-content>
                        <v-list-tile-title>{{ $t("route.logout") }}</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
            </v-list>
        </v-navigation-drawer>
        <v-toolbar fixed app :clipped-left="true">
            <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
            <v-toolbar-title style="width: 300px" class="ml-0 pl-3">
                <span></span>
            </v-toolbar-title>
        </v-toolbar>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import * as router from '../../router';
import {Getter} from 'vuex-class';
import {Club} from '@/generated';
import {ROUTE_CLUB} from '@/router';
import {RouteConfig} from 'vue-router';

@Component
export default class Navigation extends Vue {

    @Getter public features!: string[];
    @Getter public userLogin!: string;
    @Getter public clubs!: Club[];
    private drawer = null;

    public getMenuName(item: RouteConfig): string {
        return item.meta.fullname || this.$t('route.' + item.name);
    }

    public isMobile(): boolean {
        return this.$refs.navDrawer && (this.$refs.navDrawer as any).isMobile;
    }

    private canAccess(route: RouteConfig): boolean {
        if (route.meta
            && route.meta.features
            && route.meta.features.filter((f: string) => this.features.includes(f)).length === 0) {
            return false;
        }

        // Don't show empty menus
        if (route.children && route.children.length  > 0 && this.getChildren(route).length === 0) {
            return false;
        }

        return true;
    }

    private getChildren(route: RouteConfig) {
        return route.children ? route.children.filter((c: RouteConfig) => this.canAccess(c)) : [];
    }

    get items() {
        const items: any[] = router.subRoutes.filter((route) => route.name !== ROUTE_CLUB && this.canAccess(route));

        const clubRoute = router.subRoutes.filter((route) => route.name === ROUTE_CLUB)[0];

        this.clubs.forEach((club) => {
            items.push({
                path: '/club/' + club.id,
                name: ROUTE_CLUB + club.id,
                meta: {
                    fullname: club.name,
                    icon: 'fa-pizza-slice',
                },
                children: clubRoute.children,
            });

        });

        return items;
    }

    private logout() {
        this.$store.dispatch('Logout').then(() => {
            this.$router.push({ path: '/login'});
        });
    }
}
</script>
