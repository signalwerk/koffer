# brew tap mongodb/brew
# brew install mongodb-community@4.2

export $(cat .env | xargs)

# now as filesystem-compatible version
NOWFS()
{
  echo `date "+%Y-%m-%d--%H-%M"`
}

mongodump --uri="$MONGODB_URI" --out="./backup/`NOWFS`/"
