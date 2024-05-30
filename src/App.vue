<template>
  <v-layout class="rounded rounded-md">
    <v-app-bar color="white">
      <template v-slot:prepend>
        <v-avatar image="/Rick_and_Morty.svg"></v-avatar>
      </template>
      <v-app-bar-title>
        The Rick and Morty
      </v-app-bar-title>
    </v-app-bar>
    <v-navigation-drawer>
    </v-navigation-drawer>
    <v-navigation-drawer location="right">
    </v-navigation-drawer>
    <v-main class="bg-white">
      <v-container>
        <v-row>
          <v-col cols="12" offset-sm="2" sm="8" offset-md="3" md="6" class="me-auto">
            <v-expansion-panels>
              <v-expansion-panel>
                <v-expansion-panel-title>
                  <v-icon color="black" class="mr-2" icon="mdi mdi-filter"></v-icon>
                  Filters
                </v-expansion-panel-title>
                <v-expansion-panel-text>
                  <v-text-field label="Name" clearable v-model="name"/>
                  <v-select label="Status" :items="['alive', 'dead', 'unknown']" clearable v-model="status"/>
                </v-expansion-panel-text>
              </v-expansion-panel>
            </v-expansion-panels>
          </v-col>
        </v-row>
        <v-row>
          <v-col lg="3" md="4" sm="6" cols="12" v-for="char in characters.results">
            <v-skeleton-loader :elevation="1" type="card" :loading="loading">
              <v-responsive>
                <v-card>
                  <v-img
                      :src="char.image"
                      class="align-end"
                      height="250"
                      cover
                  ></v-img>
                  <v-card-title>{{char.name}}</v-card-title>
                  <v-card-subtitle class="text-wrap">
                      <v-chip class="ma-1"
                          icon
                          variant="tonal"
                          :color="char.status === 'Alive' ? 'teal' : char.status === 'Dead' ? 'red' : ''"
                          :prepend-icon="char.status === 'Alive' ? 'mdi-check-bold' : char.status === 'Dead' ? 'mdi-coffin' : 'mdi-help'">
                        {{char.status}}
                        <v-tooltip activator="parent" location="top">Status</v-tooltip>
                      </v-chip>
                      <v-chip class="ma-1"
                          icon
                          variant="tonal"
                          color="primary">
                        {{char.species}}
                        <v-tooltip activator="parent" location="top">Species</v-tooltip>
                      </v-chip>
                      <v-chip class="ma-1"
                              icon
                              variant="tonal"
                              :color="char.gender === 'Male' ? 'teal' : char.gender === 'Female' ? 'red' : ''"
                              :prepend-icon="char.gender === 'Male' ? 'mdi-gender-male' : char.gender === 'Female' ? 'mdi-gender-female' : 'mdi-help'">
                        {{char.gender}}
                        <v-tooltip activator="parent" location="top">Gender</v-tooltip>
                      </v-chip>
                  </v-card-subtitle>
                  <v-list>
                    <v-list-item>
                      <v-list-item-subtitle>
                        Last known location:
                      </v-list-item-subtitle>
                      <v-list-item-title>
                        {{char.location.name}}
                      </v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-card>
              </v-responsive>
            </v-skeleton-loader>
          </v-col>
          <v-col cols="12">
            <v-skeleton-loader :elevation="1" type="text" :loading="loading">
              <v-responsive>
                <v-pagination
                    :length="characters.info.pages"
                    v-model="page"
                    @input="loadItems"
                ></v-pagination>
              </v-responsive>
            </v-skeleton-loader>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-layout>
</template>
<script>
import _ from "lodash";
import axios from "axios";
export default {
  data: () => ({
    loading: true,
    characters: [],
    name: "",
    status: null,
    page: 1,
  }),
  mounted() {
    this.loadItems();
  },
  methods: {
    loadItems: _.debounce(function() {
      this.loading = true;
      let url = `https://rickandmortyapi.com/api/character?page=${this.page}`;
      if (this.name) {
        url += `&name=${this.name}`;
      }
      if (this.status) {
        url += `&status=${this.status}`;
      }
      axios.get(url)
          .then(response => {
            this.characters = response.data;
          }).catch(error => {

          }).finally(() => {
            this.loading = false;
          });
    }, 500),
  },
  watch: {
    page() {
      this.loadItems()
    },
    name() {
      this.page = 1;
      this.loadItems();
    },
    status() {
      this.page = 1;
      this.loadItems();
    },
  }
}
</script>