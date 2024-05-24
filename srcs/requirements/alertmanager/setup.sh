#!/bin/sh

input_file="/etc/alertmanager/input.yml"
output_file="/etc/alertmanager/alertmanager.yml"
temp_file=$(mktemp)

while IFS= read -r line
do
  while echo "$line" | grep -q '\${[^}]*}'; do
    var=$(echo "$line" | sed -n 's/.*\${\([^}]*\)}.*/\1/p')
    value=$(eval echo \$$var)
    line=$(echo "$line" | sed "s/\${$var}/$value/g")
  done
  echo "$line" >> "$temp_file"
done < "$input_file"

mv "$temp_file" "$output_file"
echo "env srcript end..!"
/bin/alertmanager "--config.file=${output_file}" --storage.path=/alertmanager
# tail -f setup.sh
