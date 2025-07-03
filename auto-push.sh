#!/bin/bash

for i in {16..30}
do
  echo "Application run $i" >> dummy.txt
  git add dummy.txt
  git commit -m "Application run $i"
  git push origin main
  echo "✅ Pushed run $i"

  # Wait for Jenkins to finish before next push
  echo "⏳ Waiting 90 seconds for Jenkins job to finish..."
  sleep 90
done
