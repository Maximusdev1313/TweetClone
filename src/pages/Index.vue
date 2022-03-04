<template>
  <q-page class="relative-position">
    <q-scroll-area class="absolute full-height full-width">
          <div class="row items-end q-col-glutter-md">
        <div class="col">
        <q-input
          bottom-slots
          v-model="newTweetData"
          label="What's happening"
          counter
          maxlength="280"
          :dense="dense"
          class="inputForTweet q-py-lg q-px-md newTweet"
          autogrow

          >

          <template v-slot:before>
            <q-avatar size="xl">
              <img src="https://cdn.quasar.dev/img/avatar5.jpg">
            </q-avatar>
          </template>

          <template v-slot:append>
            <q-icon v-if="newTweetData !== ''" name="close" @click="newTweetData = ''" class="cursor-pointer" />

          </template>

        </q-input>
        </div>
        <div class="col col-shrink">

            <q-btn
              @click="addNewTweet"
              :disable="!newTweetData"
              color="primary"
              class="q-mb-md q-mr-md"
              label="Tweet"
              rounded
              unelevated
              no-caps
              />

        </div>
      </div>
      <q-separator
      size="10px"
      color="grey-2"
      class="devider"
      />
      <!-- tweet lists -->
        <q-list>
        <q-item class="q-mt-md" v-for="tweet in tweets" :key="tweet.id">
          <q-item-section avatar top>
            <q-avatar>
              <img src="https://cdn.quasar.dev/img/avatar2.jpg">
            </q-avatar>
          </q-item-section>

          <q-item-section>
            <q-item-label class="text-weigth-bold text-subtitle1">
              <strong >This is name</strong>
              <span class="text-grey">
                @Maximus
                &bull;
                <br class="lt-md">
                <span class="text-subtitle2">
                    {{ moment(tweet.date).format(" MMM DD, YYYY [at] HH:mm a") }}
                </span>
              </span>
              </q-item-label>
            <q-item-label class="inputForTweet">
              {{tweet.content}}
            </q-item-label>
            <div class="row justify-between">
              <q-btn
              color="grey"
              icon="far fa-comment"
              size="sm"
              flat
              round
              ></q-btn>
              <q-btn
              color="grey"
              icon="fas fa-retweet"
              size="sm"
              flat
              round
              ></q-btn>
              <q-btn
              @click="toggleLiked(tweet)"
              :color="tweet.liked ? 'pink' : 'grey' "
              :icon="tweet.liked ? 'fas fa-heart' : 'far fa-heart'"
              size="sm"
              flat
              round
              >
              &bull; {{tweet.likes}}
              </q-btn>

              <q-btn
              color="grey"
              icon="fas fa-trash"
              size="sm"
              flat
              round
              @click="removeTweet(tweet)"
              ></q-btn>
            </div>


          </q-item-section>
        </q-item>

        <q-separator inset="item" />



      </q-list>
    </q-scroll-area>


  </q-page>
</template>

<script>
import { defineComponent } from 'vue';
import { ref } from 'vue'
import { collection, query, where, onSnapshot, deleteDoc, addDoc, doc  } from "firebase/firestore"
import {  updateDoc } from "firebase/firestore"
import db from '../boot/firebase'
// import {addDoc } from "firebase/firestore";

// import { formatDistance} from 'date-fns'
import moment from 'moment'
export default defineComponent({
  name: 'PageIndex',
  data(){
    return{
      newTweetData: '',
      todaysDate:  Date.now(),
      tweets: [

      ]
    }
  },
  mounted(){
    const q = query(collection(db, "tweets"))
      const unsubscribe = onSnapshot(q, (snapshot) => {
        snapshot.docChanges().forEach((change) => {
          let tweetChange = change.doc.data()
          tweetChange.id = change.doc.id
          if (change.type === "added") {
              console.log("New tweet: ", tweetChange);
              this.tweets.unshift(tweetChange)
          }
          if (change.type === "modified") {
              console.log("Modified tweet: ", tweetChange);
              let index = this.tweets.findIndex(tweet => tweet.id === tweetChange.id)
              Object.assign(this.tweets[index], tweetChange)
          }
          if (change.type === "removed") {
              console.log("Removed tweet: ", tweetChange);
              let index = this.tweets.findIndex(tweet => tweet.id === tweetChange.id)
              this.tweets.splice(index, 1)
          }
        });
});
  },
  methods: {
      addNewTweet(){
       let newTweet = {
         content: this.newTweetData,
         date: Date.now(),
         liked: false,
         likes: 0
       }
        // this.tweets.unshift(newTweet)
        // Add a new document with a generated id.
          const docRef =  addDoc(collection(db, "tweets"), newTweet);
          console.log("Document written with ID: ", docRef.id);
           this.newTweetData = ''
      },
      removeTweet(tweet){
         deleteDoc(doc(db, "tweets", tweet.id));
      },
      toggleLiked(tweet){
        console.log('toggleLiked');
        console.log(tweet);
        const updateNewTweet = doc(db, "tweets", tweet.id);

         updateDoc(updateNewTweet, {
          liked: !tweet.liked,
          likes: !tweet.liked ? tweet.likes+=1 : tweet.likes-=1
});
      }
  },
  created: function () {
    this.moment = moment;
  },

  setup(){
    return{
      dense: ref(false),

    }

  }
})
</script>
<style lang="sass">
.inputForTweet
    white-space: pre-line
.newTweet
    textarea
      font-size: 16px
      line-height: 1.4 !important
.devider
    border-top: 1px solid
    border-bottom: 1px solid
    border-color: $grey-5
    margin-top: 50px
</style>
