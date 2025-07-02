#!/bin/bash
for i in {1..30}
do
  echo "// RQ2 run $i" >> dummy.txt   # adds a fake comment to dummy.txt
  git add .
  git commit -m "RQ2 run $i"
  git push
  echo "✅ Pushed run $i"
  sleep 10  # wait for 10 seconds before next push
done
