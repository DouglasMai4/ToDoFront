<template>
  <main>
    <div class="container">
      <h1>Bem Vindo <span>{{ this.$store.state.username }}</span>!</h1>

      <Input
        tp="text"
        lb="Adicionar"
        @data="(e) => this.titulo = e"
        @btn="() => this.addItem()"
      />

      <Button
        tp="button"
        lb="Sair"
        @click="() => {
          this.$store.commit('logout')
          this.$router.push('/login')
        }"
      />

      <hr />

      <Item v-for="item in itens"
        :title="item.title"
        :status="item.status"
        @btn="(e) => buttonFunction(e, item._id)"
      />
    </div>
  </main>
  <Message v-if="msg" :msg="msg" />
</template>

<script>
  import Item from '../components/Item.vue'
  import Message from '../components/Message.vue'
  import Input from '../components/form/Input.vue'
  import Button from '../components/form/Button.vue'

  import axios from 'axios'

  export default {
    name: 'Home',
    components: {
      Item,
      Message,
      Input,
      Button
    },
    data() {
      return {
        itens: null,
        msg: null,
        titulo: null
      }
    },
    methods: {
      async getItens() {
        const id = this.$store.state.id

        const req = await axios.get(`https://todo-b4ck.herokuapp.com/item/list/${id}`)

        this.itens = req.data
      },
      async buttonFunction(type, id) {
        if (type === 'finish') {
          try {
            await axios.patch(`https://todo-b4ck.herokuapp.com/item/update/${id}`, { 'status': 'Finalizado' })

            this.msg = 'Item atualizado'

            this.getItens()

            setTimeout(() => {this.msg = null}, 4500)
          } catch (error) {
            this.msg = 'Não foi possível atualizar o item'

            setTimeout(() => {this.msg = null}, 4500)
          }
        } else {
          try {
            await axios.delete(`https://todo-b4ck.herokuapp.com/item/${id}`)

            this.msg = 'Item removido'

            this.getItens()

            setTimeout(() => {this.msg = null}, 4500)
          } catch (error) {
            this.msg = 'Não foi possível remover o item'

            setTimeout(() => {this.msg = null}, 4500)
          }
        }
      },
      async addItem() {
        if (!this.titulo) {
          this.msg = 'Preencha o nome do item!'

          setTimeout(() => {this.msg = null}, 4500)
        } else {
          const id = this.$store.state.id

          try {
            const req = await axios.post(`https://todo-b4ck.herokuapp.com/item/add`, {
              'title': `${this.titulo}`,
              'status': 'Cadastrado',
              'user_id': `${id}`
            })

            if (req.status === 201) {
              this.msg = 'Item adicionado!'

              this.getItens()

              setTimeout(() => {this.msg = null}, 4500)
            } else {
              this.msg = 'Não foi possível adicionar o item'

              setTimeout(() => {this.msg = null}, 4500)
            }
          } catch (error) {
            this.msg = 'Ocorreu um erro!'

            setTimeout(() => {this.msg = null}, 4500)
          }
        }
      }
    },
    mounted() {
      if (!this.$store.state.username) {
        this.$router.push('/login')
      }

      this.getItens()
    }
  }
</script>

<style scoped>
  main {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    min-height: 100vh;

    color: var(--c-text-primary);

    text-align: center;
  }

  h1 span {
    color: var(--c-primary);
  }

  hr {
    margin-block: 15px;
  }

  .container {
    display: flex;
    flex-direction: column;
    gap: 15px;

    background-color: var(--bg-color-tran);
    backdrop-filter: blur(5px);

    padding: 15px;
    border-radius: 10px;
  }
</style>