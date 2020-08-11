<template>
    <div>
        <nav class="light-blue darken-1">
            <div class="nav-wrapper">
                <router-link to="/" class="brand-logo">Logo</router-link>
                <ul id="nav-mobile" class="right hide-on-med-and-down">
                    <router-link
                    to="/"
                    tag="li"
                    exact
                    active-class="active">
                        <a href="#">Create</a>
                    </router-link>
                    <router-link
                    to="/list"
                    tag="li"
                    active-class="active">
                        <a href="#">List</a>
                    </router-link>
                     <router-link
                    to="/task"
                    tag="li"
                    active-class="active">
                        <a href="#">Task</a>
                    </router-link>
                </ul>
            </div>
        </nav>      
    </div>
</template>

<style lang="sass" scoped>
    nav
        padding: 0 20px

</style>