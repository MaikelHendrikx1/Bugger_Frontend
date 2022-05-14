<script setup lang="ts">
import AccountBar from "./accountBar.vue";
</script>

<script lang="ts">
import store from "../store";
import axios from "axios";
import endpoints from "../services.json";
import { AxiosRequestConfig } from "axios";

export default {
  data() {
    return {
      pages: {} as [{ id: number; name: string }],
      searching: false as boolean,
      currentPath: "" as string,
      currentPage: {},
      showReportForm: false as boolean,
    };
  },
  mounted() {
    this.emitInterface();
  },
  methods: {
	emitInterface() {
		this.$emit("interface", {
			UpdateNav: () => this.UpdateNav()
		})
	},

    UpdatePages(event) {
      if (event.target.value.length > 0) {
        this.searching = true;

        let config: AxiosRequestConfig = {
          params: {
            filter: event.target.value,
            amount: 5,
          },
        };

        let that = this;
        axios
          .get(endpoints.urls.buggerpage + "BuggerPages/all", config)
          .then(function (response) {
            that.pages = response.data;
          });
      } else {
        this.searching = false;
        this.pages = {};
      }
    },
    UpdateNav() {
      this.currentPage = store.data.currentPage;
      this.pages = {};
      this.searching = false;
    },
  },
  watch: {
    $route(to) {
      this.currentPath = to.path.toLowerCase();
    },
  },
};
</script>

<template>
  <div class="header">
    <div class="logo">
      <h1>
        <router-link
          class="navEntry"
          style="text-decoration: none"
          :to="{ path: '/' }"
          >Bugger</router-link
        >
      </h1>
    </div>

    <!-- Overview navbar -->
    <div
      v-if="currentPath == '/overview/' || currentPath == '/createreport/'"
      class="nav"
    >
      <h2>
        -
        <router-link
          class="navEntry"
          style="text-decoration: none"
          :to="`/overview/?id=${currentPage.id}`"
          >{{ currentPage.name }}</router-link
        >
      </h2>
      <h2>
        <router-link
          class="navEntry"
          style="margin-inline-start: 30%"
          :to="`/createreport/?id=${currentPage.id}`"
          >Create_bug_report</router-link
        >
      </h2>
      <img style="display: none" src @error="UpdateNav()" />

      <AccountBar class="alignRight" />
    </div>

    <!-- Default navbar -->
    <div v-else class="nav">
      <input
        placeholder="Search for a page..."
        autocomplete="off"
        @input="UpdatePages($event)"
        type="text"
        id="inp"
        data-bs-toggle="dropdown"
      />
      <ul class="dropdown-menu dropdown-menu-dark" aria-labelledby="inp">
        <li v-for="page in pages" :key="page.name">
          <router-link
            href="#"
            :to="`/overview/?id=${page.id}`"
            class="dropdown-item"
            >{{ page.name }}</router-link
          >
        </li>

        <li class="dropdown-item" v-if="!pages.length && searching">
          No pages found
        </li>
      </ul>

      <AccountBar class="alignRight" />
    </div>
  </div>
</template>

<style scoped>
.alignRight {
  right: 0;
  position: fixed;
  margin-right: 30px;
  top: 10px;
}

.header {
  width: 100%;
  background-color: indianred;
  padding-inline: 20px;
  display: flex;
  height: 10vh;
}

h1 {
  padding: 5px;
}

div {
  margin: 0;
}

.nav {
  width: 50%;
  margin-block: auto;
}

.navEntry {
  color: lightgray;
  padding-inline: 6px;
}

.login {
  width: 25%;
  margin: auto;
}

body {
  color: lightgray;
}
</style>