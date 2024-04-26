import { Environment } from "vitest";

export default <Environment> {
    name: 'prisma',
    async setup(){
        console.log('Setup executed!')

        return {
            async teardown() {
                console.log("Teardown executed!")
            },
        }
    },
    transformMode:"ssr"
}