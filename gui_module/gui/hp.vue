<template>
    <div class="health-bar">
        <div class="bar">
            <p>{{ hp }} / {{ maxHp }}</p>
            <div class="inner-bar" :style="{ width }"></div>
        </div>
    </div>
</template>

<script lang="ts">
export default {
    name: 'hp',
    inject: ['rpgCurrentPlayer'],
    mounted() {
        this.obsCurrentPlayer = this.rpgCurrentPlayer
            .subscribe(({ object }) => {
                this.hp = object.hp
                this.maxHp = object.param.maxHp
            })
    },
    unmounted() {
        this.obsCurrentPlayer.unsubscribe()
    },
    data() {
        return {
            hp: 0,
            maxHp: 0
        }
    },
    computed: {
        width() {
            return ((this.hp / this.maxHp) * 100) + '%'
        }
    }
}
</script>

<style>
.health-bar {
    width: 200px;
    margin-top: 10px;
    margin-left: 10px;
    position: absolute;
    /*background: rgba(0, 0, 0, 0.3)*/
}

.health-bar p {
    margin: 5px;
    color: white;
    font-size: 21px;
    font-weight: bold;
}

.bar {

    border-radius: 5px;
    position: relative;
}

.inner-bar {
    border: 2px solid black;
    background: #c54;
    height: 10px;
    position: relative;
    transition: width .5s linear;
}
</style>