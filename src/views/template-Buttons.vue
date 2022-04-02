<template>
    <div>
        <Buttons :buttons="buttons"></Buttons>
    </div>
</template>

<script setup>
    import Buttons from '../components/Buttons/Buttons.vue'

    const buttons = [
        { 
            title: '按钮1',
            click: () => {
                console.log('点击按钮1');
            },
            props: {
                disabled: true
            }
        },
        {
            title: '按钮2',
            type: 'danger',
            click: () => {
                console.log('点击按钮2');
            }
        }
    ]
</script>

<style>

</style>